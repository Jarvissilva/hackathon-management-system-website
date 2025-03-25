"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDatabase from "utilities/connectDatabase";
import sendMail from "utilities/sendMail";
import UserModel from "models/user";
import HackathonModel from "models/hackathon";
import TeamModel from "models/team";

export async function newUser(_, formData) {
  try {
    await connectDatabase();

    const newUser = await new UserModel({
      name: formData.get("name"),
      email: formData.get("email"),
    }).save();

    const encodedToken = jwt.sign(
      { _id: newUser._id, type: "user" },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 300,
      }
    );

    await sendMail({
      to: formData.get("email"),
      subject: "Verify your login",
      html: `login by using this link:<a href="${process.env.SITE_URL}/verify-login?token=${encodedToken}&redirect=/dashboard/hackathon/new">Verify Now</a> or open the below link in your browser: <p>${process.env.SITE_URL}/verify-login?token=${encodedToken}&redirect=/dashboard/hackathon/new</p>`,
    });

    return { success: true, message: "User successfully created" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function loginUser(_, formData) {
  try {
    await connectDatabase();

    const foundUser = await UserModel.exists({ email: formData.get("email") });

    if (!foundUser)
      return {
        success: false,
        message: "User does not exists with this email",
      };

    const encodedToken = jwt.sign(
      { _id: foundUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 300,
      }
    );

    await sendMail({
      to: formData.get("email"),
      subject: "Verify your login",
      html: `login by using this link:<a href="${process.env.SITE_URL}/verify-login?token=${encodedToken}">Verify Now</a> or open the below link in your browser: <p>${process.env.SITE_URL}/verify-login?token=${encodedToken}</p>`,
    });

    return {
      success: true,
      message: "Check your mail we sent you a link to login",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
export async function loginHackathon(_, formData) {
  try {
    await connectDatabase();

    const foundHackathon = await HackathonModel.findOne({
      code: formData.get("code"),
    });

    if (!foundHackathon)
      return {
        success: false,
        message: "Hackathon does not exist",
      };

    const foundTeam = await TeamModel.findOne({
      leader_email: formData.get("email"),
      hackathon: foundHackathon._id,
    });

    if (!foundTeam)
      return {
        success: false,
        message: "Team does not exists with this email",
      };

    const encodedToken = jwt.sign(
      { _id: foundTeam._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 300,
      }
    );

    await sendMail({
      to: formData.get("email"),
      subject: "Verify your login",
      html: `login by using this link:<a href="${process.env.SITE_URL}/verify-login?token=${encodedToken}&type=team">Verify Now</a> or open the below link in your browser: <p>${process.env.SITE_URL}/verify-login?token=${encodedToken}&type=team</p>`,
    });

    return {
      success: true,
      message: "Check your mail we sent you a link to login",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function verifyLogin(encodedToken, type) {
  try {
    const decodedToken = jwt.verify(encodedToken, process.env.JWT_SECRET_KEY);

    await connectDatabase();

    let found;

    if (type == "team") {
      found = await TeamModel.findById(decodedToken._id);
    } else {
      found = await UserModel.findById(decodedToken._id);
    }
    if (!found) return { success: false, message: "User does not exists" };

    const authToken = jwt.sign({ _id: found._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    cookies().set({
      name: "auth",
      value: authToken,
      httpOnly: true,
      path: "/",
      sameSite: "Strict",
      maxAge: 604800,
    });

    return { success: true, message: "Verified Successfully Redirecting..." };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function getLoggedUser(forTeam) {
  try {
    const authCookie = cookies().get("auth");

    if (!authCookie) return { success: false, message: "User not logged in" };

    const decodedToken = jwt.verify(
      authCookie.value,
      process.env.JWT_SECRET_KEY
    );

    await connectDatabase();

    let foundUser = await TeamModel.findById(decodedToken._id);

    if (!foundUser) {
      foundUser = await UserModel.findById(decodedToken._id);
    }

    if (!foundUser)
      return {
        success: false,
        message: "User does not exist",
      };

    return JSON.parse(JSON.stringify({ success: true, user: foundUser }));
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function logout() {
  cookies().delete("auth");
}
