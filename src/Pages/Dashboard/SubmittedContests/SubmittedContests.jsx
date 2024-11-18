import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import useCreatorContest from "../../../Hooks/useCreatorContest";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useWinner from "../../../Hooks/useWinner";

const SubmittedContests = () => {
  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState(null);
  const [contestData] = useCreatorContest();
  const { User } = useAuth();
  const axiosPublic=useAxiosPublic();
  const [Winner,setWinner]=useWinner();
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
  }, [User?.email]);

  // Handle declaring a winner
  const declareWinner = (id,name) => {
    setWinner("");
    axiosPublic.patch(`/contests/updateWinner/${id}`)
    .then(res=>{
      setWinner(name);
      Swal.fire({
        title:"Winner Declared",
        icon:"success"
      })
    })

  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Creator's Contests</h1>

      {/* Display All Contests */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Your Contests</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contests.map((contest) => (
            <div
              key={contest.contestId}
              className="p-4 border rounded shadow cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedContest(contest.contestId)}
            >
              <h3 className="text-xl font-medium">{contest.contestName}</h3>
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
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">
            Submissions for Contest
          </h2>
          {contests
            .filter((contest) => contest.contestId === selectedContest)
            .map((submission) => (
              <div
                key={submission._id}
                className="p-4 font-jost border rounded shadow flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0"
              >
                <div className="sm:w-2/3 space-y-2">
                  <p>
                    <strong>Participant Name:</strong> {submission.name}
                  </p>
                  <p className="text-[10px] md:text-xs lg:text-base">
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
                <div className="sm:w-1/3 flex justify-end">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
                    onClick={() => declareWinner(submission.contestId,submission.name)}
                  >
                    Declare Win
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SubmittedContests;
