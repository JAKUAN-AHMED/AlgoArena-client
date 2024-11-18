import React from "react";
import useUserContest from "../../Hooks/useUserContest";
import useContests from "../../Hooks/useContests";
import { Link } from "react-router-dom";

const UserInfo = () => {
  const [userContests, loading3] = useUserContest(); 
  console.log("userInfo",userContests.length);
  // Participated contests
  const [contests] = useContests(); // All contests

  // Filter upcoming contests
  const upcomingContests = contests.filter(
    (contest) => new Date(contest.deadline) > new Date()
  );
  if(loading3) 
  {
    return <p>loading.......</p>
  }
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">User Info</h1>

      {/* Participated Contests Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          My Participated Contests
        </h2>
        {userContests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userContests.map((contest) => (
              <div
                key={contest.contestId}
                className="border p-4 rounded shadow"
              >
                <h3 className="text-xl font-medium">{contest.contestName}</h3>
                <p>
                  <strong>Payment Status:</strong>{" "}
                  <span
                    className={`font-bold ${
                      contest.status === "success"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {contest.status}
                  </span>
                </p>
                <div className="mt-4">
                  {new Date(contest.deadline) > new Date() ? (
                    <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                      Participate Now
                    </button>
                  ) : (
                    <button
                      className="bg-gray-400 text-white px-4 py-2 rounded w-full cursor-not-allowed"
                      disabled
                    >
                      Deadline Passed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No participated contests found.</p>
        )}
      </section>

      {/* Upcoming Contests Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Upcoming Contests</h2>
        {upcomingContests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingContests.map((contest) => (
              <div key={contest._id} className="border p-4 rounded shadow">
                <h3 className="text-xl font-medium">{contest.contestName}</h3>
                <p>
                  <strong>Prize:</strong> ${contest.entryFee * 10}
                </p>
                <p>
                  <strong>Deadline:</strong>{" "}
                  {new Date(contest.deadline).toLocaleDateString()}
                </p>
                <Link to={`/contestDetails/${contest._id}`}>
                  <button className="bg-green-500 text-white px-4 py-2 rounded w-full mt-4">
                    Learn More
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No upcoming contests found.</p>
        )}
      </section>
    </div>
  );
};

export default UserInfo;
