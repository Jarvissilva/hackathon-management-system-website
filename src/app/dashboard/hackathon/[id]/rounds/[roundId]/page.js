import { getLoggedUser } from "actions/auth";
import { getRound, selectRoundProblem } from "actions/round";
import { TextInput } from "components/form";
import RoundSubmissionForm from "components/forms/roundSubmission";
import {
  Button,
  Evaluate,
  H1,
  H2,
  LinkButton,
  P,
  SubmitButton,
} from "components/utilities";
import Link from "next/link";

export default async function Page({ params, searchParams }) {
  const authRes = await getLoggedUser();
  const roundRes = await getRound(params.roundId);

  console.log("User ID:", authRes.user._id);
  console.log("Problems:", roundRes.round?.problems);

  // Find the selected problem for this user
  const selectedProblem = roundRes.round?.problems.find((problem) => {
    return problem.assigned_teams.includes(authRes.user._id);
  });

  const submittedProblem = roundRes.round?.problems.find((problem) => {
    return problem.submissions.find((s) => s.team == authRes.user._id);
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <H1 styles="grow">Round</H1>
        {!authRes.user.team_name && (
          <LinkButton
            to={`/dashboard/hackathon/edit/${
              searchParams.id ? searchParams.id : params.id
            }`}
          >
            Edit
          </LinkButton>
        )}
      </div>

      <div>
        {/* Participants: Show only their problem */}
        {authRes.user.team_name ? (
          <div className="space-y-4">
            <div className="space-y-4">
              <H2 styles="text-xl">Problem Statement</H2>
              {selectedProblem ? (
                <div className="border rounded-md p-4">
                  <h3 className="text-xl font-bold">{selectedProblem.name}</h3>
                  <P>{selectedProblem.description}</P>
                </div>
              ) : (
                roundRes.round.problems.map((problem, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold">
                        {index + 1} {problem.name}
                      </h3>
                      <Button
                        text="Select"
                        problemId={problem._id}
                        roundId={roundRes.round._id}
                        userId={authRes.user._id}
                      />
                    </div>
                    <P>{problem.description}</P>
                  </div>
                ))
              )}
            </div>

            {selectedProblem && !submittedProblem && (
              <div className="space-y-4">
                <H2 styles="text-xl">Submission</H2>
                <RoundSubmissionForm
                  roundId={roundRes.round._id}
                  userId={authRes.user._id}
                />
                <SubmitButton form="round-submission-form" text="Submit" />
              </div>
            )}
          </div>
        ) : (
          // Coordinators: Show full table of all problems
          <table className="text-left w-full border-gray-200 mt-4">
            <thead>
              <tr className="border-b border-t">
                <th className="p-2">Problem</th>
                <th className="p-2">Description</th>
                <th className="p-2">Assigned Team</th>
                <th className="p-2">Submission</th>
                <th className="p-2">Evaluate</th>
              </tr>
            </thead>
            <tbody>
              {roundRes.round.problems.map((problem, index) => (
                <tr key={index} className="border-b">
                  <td className="border-b p-2">{problem.name}</td>
                  <td className="border-b p-2">{problem.description}</td>
                  <td className="border-b p-2">
                    {problem.assigned_teams.length > 0
                      ? "Assigned"
                      : "Not Assigned"}
                  </td>
                  <td className="border-b p-2">
                    {problem.submissions.length > 0 ? (
                      <Link
                        href={problem.submissions[0].file_url} // Assuming we take the first submission
                        target="_blank"
                        className="text-blue-500 underline"
                      >
                        View Submission
                      </Link>
                    ) : (
                      "No Submission"
                    )}
                  </td>
                  <td className="border-b p-2">
                    {problem.submissions.length > 0 ? (
                      problem.submissions.some(
                        (submission) => submission.evaluated
                      ) ? (
                        <span className="text-green-600">Evaluated</span>
                      ) : (
                        <Evaluate
                          roundId={roundRes.round._id}
                          userId={authRes.user._id}
                        />
                      )
                    ) : (
                      "No Submission"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
