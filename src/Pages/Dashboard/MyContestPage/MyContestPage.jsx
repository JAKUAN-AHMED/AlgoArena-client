import React, { useState } from "react";
import useCreatorContest from "../../../Hooks/useCreatorContest";

const MyContestPage = () => {
  const [contestData] = useCreatorContest();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContestId, setSelectedContestId] = useState(null);

  // Example admin comments, you would likely fetch these from your database
  const adminComments = {
    contest1_id: "This contest needs some updates before approval.",
    contest2_id: "Approved. Please proceed with the next steps.",
    contest3_id: "Review required before confirming.",
  };

  // Admin status for deletion
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

  // Open modal to view admin comments
  const handleCommentClick = (contestId) => {
    setSelectedContestId(contestId);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContestId(null);
  };

  return (
    <div className="font-jost p-4">
      <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-bold mb-5">
        My Contests
      </h1>

      {/* Responsive Table with Horizontal Scroll on Small Screens */}
      <div className="p-4 overflow-scroll">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border p-2 text-left  text-xs md:text-sm lg:text-base mr-4">
                Contest Name
              </th>
              <th className="border p-2 text-xs md:text-sm lg:text-base pl-14">
                Description
              </th>
              <th className="border px-2 py-1 text-xs md:text-sm  text-left lg:text-base">
                Status
              </th>
              <th className="border p-2 text-sm sm:text-base">Actions</th>
              <th className="border p-2 text-sm sm:text-base">
                Admin Comments
              </th>
            </tr>
          </thead>
          <tbody>
            {contestData.map((contest) => (
              <tr key={contest._id} className="text-center">
                <td className="border p-2 flex gap-2 text-sm sm:text-base">
                  {contest.contestName}
                </td>
                <td className="border px-1 py-1">
                  {contest.contestDescription}
                </td>
                <td className="border p-2 text-sm sm:text-base">
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
                <td className="border p-2 text-sm sm:text-base">
                  {contest.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleEdit(contest._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2 text-xs sm:text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(contest._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-xs sm:text-sm"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleSeeSubmissions(contest._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded text-xs sm:text-sm"
                    >
                      See Submissions
                    </button>
                  )}
                </td>
                <td className="border p-2 text-sm sm:text-base">
                  <button
                    onClick={() => handleCommentClick(contest._id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-xs sm:text-sm"
                  >
                    View Comments
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Admin Comments */}
      {isModalOpen && selectedContestId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 sm:w-1/2">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              Admin Comments
            </h2>
            {/* Display admin comment dynamically */}
            <p className="text-sm sm:text-base">
              {adminComments[selectedContestId] ||
                "No comments available for this contest."}
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded text-xs sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyContestPage;
