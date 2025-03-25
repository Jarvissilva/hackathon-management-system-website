import nodemailer from "nodemailer";

const sendMail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    secure: true,
    secureConnection: false,
    tls: {
      ciphers: "SSLv3",
    },
    requireTLS: true,
    port: 465,
    debug: true,
    connectionTimeout: 10000,
    auth: {
      user: process.env.GMAIL_HOST_MAIL,
      pass: "fhaf388y1y#hf39Ahdf",
    },
  });
  return transporter.sendMail({
    from: process.env.GMAIL_HOST_MAIL,
    to,
    subject,
    html,
  });
};

export default sendMail;
