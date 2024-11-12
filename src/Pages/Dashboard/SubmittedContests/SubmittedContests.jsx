import React, { useState } from "react";

// Sample data for contests and submissions
const contestsData = [
  {
    _id: 1,
    contestTitle: "Competitive Programming Contest",
    prize: 300,
    submissions: [
      {
        id: 1,
        participantName: "John Doe",
        email: "john@example.com",
        taskLink: "https://drive.google.com/file/d/1abc123",
        isWinner: false,
      },
      {
        id: 2,
        participantName: "Jane Smith",
        email: "jane@example.com",
        taskLink: "https://drive.google.com/file/d/2xyz456",
        isWinner: false,
      },
    ],
  },
  {
    _id: 2,
    contestTitle: "Web Development Contest",
    prize: 200,
    submissions: [
      {
        id: 1,
        participantName: "Alice Johnson",
        email: "alice@example.com",
        taskLink: "https://drive.google.com/file/d/3ghi789",
        isWinner: false,
      },
    ],
  },
];

const SubmittedContests = () => {
  const [selectedContest, setSelectedContest] = useState(null);
  const [contests, setContests] = useState(contestsData);

  // Function to handle winner declaration
  const handleDeclareWinner = (contestId, submissionId) => {
    setContests((prevContests) =>
      prevContests.map((contest) =>
        contest._id === contestId
          ? {
              ...contest,
              submissions: contest.submissions.map((submission) =>
                submission.id === submissionId
                  ? { ...submission, isWinner: true }
                  : { ...submission, isWinner: false }
              ),
            }
          : contest
      )
    );
  };

  return (
    <div className="contest-submissions-container p-4">
      <h1 className="text-center text-xl font-bold mb-5">
        My Contests & Submissions
      </h1>

      {/* Contest List */}
      <div className="contest-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {contests.map((contest) => (
          <div
            key={contest._id}
            className="contest-card border p-4 rounded shadow-lg hover:shadow-xl transition-all"
            onClick={() => setSelectedContest(contest)}
          >
            <h3 className="text-lg font-semibold">{contest.contestTitle}</h3>
            <p className="text-sm text-gray-600">Prize: ${contest.prize}</p>
          </div>
        ))}
      </div>

      {/* Show Submissions of the selected contest */}
      {selectedContest && (
        <div className="submissions-list">
          <h2 className="text-center text-lg font-semibold mb-4">
            Submissions for "{selectedContest.contestTitle}"
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Participant Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Task Link</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedContest.submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td className="border p-2">{submission.participantName}</td>
                    <td className="border p-2">{submission.email}</td>
                    <td className="border p-2">
                      <a
                        href={submission.taskLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        View Submission
                      </a>
                    </td>
                    <td className="border p-2">
                      {!submission.isWinner ? (
                        <button
                          onClick={() =>
                            handleDeclareWinner(
                              selectedContest._id,
                              submission.id
                            )
                          }
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                          Declare Winner
                        </button>
                      ) : (
                        <span className="bg-green-200 p-1 rounded">Winner</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmittedContests;
