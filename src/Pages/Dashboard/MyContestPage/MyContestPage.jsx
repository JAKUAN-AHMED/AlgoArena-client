import React, { useState } from "react";

const MyContestPage = () => {
  // Example contest data
  const contests = [
    {
      _id: 1,
      contestName: "Competitive Programming Contest",
      contestImage: "https://i.ibb.co.com/Wc3PQYK/c4.jpg",
      contestDescription:
        "Solve algorithmic problems in a timed competitive environment.",
      status: "pending", // Change this to "accepted" to simulate the admin accepting it
    },
    {
      _id: 2,
      contestName: "Web Development Contest",
      contestImage: "https://i.ibb.co.com/ZhLjzpm/c.jpg",
      contestDescription: "Build and showcase your web development skills.",
      status: "accepted",
    },
    {
      _id: 3,
      contestName: "Machine Learning Hackathon",
      contestImage: "https://i.ibb.co.com/Wt5VkXw/c1.jpg",
      contestDescription: "Develop AI models to solve real-world problems.",
      status: "pending",
    },
  ];

  // Admin status for deletion, for example
  const isAdmin = true;

  // Handle delete contest
  const handleDelete = (contestId) => {
    if (isAdmin) {
      alert(`Admin has deleted contest with ID: ${contestId}`);
      // Here you would call the API to delete the contest
    } else {
      alert("Only admin can delete accepted contests.");
    }
  };

  // Handle edit contest
  const handleEdit = (contestId) => {
    alert(`Editing contest with ID: ${contestId}`);
    // Here you would redirect or show an edit form
  };

  // Handle see submissions
  const handleSeeSubmissions = (contestId) => {
    alert(`Redirecting to submissions for contest with ID: ${contestId}`);
    // Here you would redirect to submissions page
  };

  return (
    <div className="my-contests">
      <h1 className="text-center text-xl font-bold mb-5">My Contests</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Contest Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contests.map((contest) => (
            <tr key={contest._id}>
              <td className="border p-2">
                <img
                  src={contest.contestImage}
                  alt={contest.contestName}
                  className="w-12 h-12"
                />
                {contest.contestName}
              </td>
              <td className="border p-2">{contest.contestDescription}</td>
              <td className="border p-2">
                <span
                  className={`${
                    contest.status === "accepted"
                      ? "bg-green-200"
                      : "bg-yellow-200"
                  } p-1 rounded`}
                >
                  {contest.status}
                </span>
              </td>
              <td className="border p-2">
                {/* Show only edit/delete buttons if the contest is pending */}
                {contest.status === "pending" ? (
                  <>
                    <button
                      onClick={() => handleEdit(contest._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(contest._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleSeeSubmissions(contest._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    See Submissions
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyContestPage;
