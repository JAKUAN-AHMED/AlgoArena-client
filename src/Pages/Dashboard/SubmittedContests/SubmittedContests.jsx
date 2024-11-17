import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";

const SubmittedContests = () => {
  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState(null);
  const [winners, setWinners] = useState({}); // Tracks declared winners by contestId
  const {User}=useAuth();
  // Fetch data when the component mounts
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/payment-history/emailData/email?email=${User?.email}`
      )
      .then((response) => {
        setContests(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle declaring a winner
  const declareWinner = (contestId, submissionId) => {
    setWinners((prev) => ({
      ...prev,
      [contestId]: submissionId,
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Creator's Contests</h1>

      {/* Display All Contests */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Your Contests</h2>
        <div className="space-y-4">
          {contests.map((contest) => (
            <div
              key={contest.contestId}
              className="p-4 border rounded shadow cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedContest(contest.contestId)}
            >
              <h3 className="text-xl font-medium">{contest.name}</h3>
              <p>
                <strong>Prize:</strong> ${contest.entryFee * 10}{" "}
                {/* Example Prize Logic */}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Selected Contest Details */}
      {selectedContest && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Submissions for Contest
          </h2>
          <div className="space-y-4">
            {contests
              .filter((contest) => contest.contestId === selectedContest)
              .map((submission) => (
                <div
                  key={submission._id}
                  className="p-4 border rounded shadow flex items-center justify-between"
                >
                  <div>
                    <p>
                      <strong>Participant Name:</strong> {submission.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {submission.email}
                    </p>
                    <p>
                      <strong>Task:</strong>{" "}
                      <a
                        href={submission.pdfLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View Submission
                      </a>
                    </p>
                  </div>
                  <div>
                    {winners[selectedContest] === submission._id ? (
                      <button
                        className="bg-green-600 text-white px-4 py-2 rounded"
                        disabled
                      >
                        Winner
                      </button>
                    ) : (
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() =>
                          declareWinner(selectedContest, submission._id)
                        }
                      >
                        Declare Win
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmittedContests;
