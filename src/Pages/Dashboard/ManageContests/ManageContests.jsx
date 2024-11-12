import React, { useState } from "react";
import useContests from "../../../Hooks/useContests";



const ManageContests = () => {
  const [contests] = useContests();
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [selectedContest, setSelectedContest] = useState(null);
  const [comment, setComment] = useState("");

  const handleDelete = (id) => {
    // setContests(contests.filter((contest) => contest.id !== id));
    // Implement delete from database logic here
  };

  const handleConfirm = (id) => {
    // setContests(
    //   contests.map((contest) =>
    //     contest.id === id ? { ...contest, status: "Confirmed" } : contest
    //   )
    // );
    // Implement confirm in database logic here
  };

  const handleComment = (contest) => {
    setSelectedContest(contest);
    setCommentModalOpen(true);
  };

  const handleCommentSubmit = () => {
    console.log("Comment submitted:", comment);
    setCommentModalOpen(false);
    setComment("");
    // Send comment to the database and link to the creator dashboard
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl md:text-3xl font-semibold text-center mb-4 md:mb-8">
        Manage Contests
      </h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-xs md:text-sm leading-normal">
              <th className="py-2 px-2 md:py-3 md:px-6">Title</th>
              <th className="py-2 px-2 md:py-3 md:px-6">Date</th>
              <th className="py-2 px-2 md:py-3 md:px-6">Status</th>
              <th className="py-2 px-2 md:py-3 md:px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-xs md:text-sm font-light">
            {contests.map((contest) => (
              <tr
                key={contest._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-2 px-2 md:py-3 md:px-6">{contest.contestName}</td>
                <td className="py-2 px-2 md:py-3 md:px-6">{contest.deadline}</td>
                <td className="py-2 px-2 md:py-3 md:px-6">{contest.status}</td>
                <td className="py-2 px-2 md:py-3 md:px-6 space-y-1 sm:space-y-0 sm:space-x-2 md:space-x-3 flex flex-col sm:flex-row">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white text-xs md:text-sm px-3 md:px-4 py-1 rounded"
                    onClick={() => handleDelete(contest.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white text-xs md:text-sm px-3 md:px-4 py-1 rounded"
                    onClick={() => handleConfirm(contest.id)}
                  >
                    Confirm
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs md:text-sm px-3 md:px-4 py-1 rounded"
                    onClick={() => handleComment(contest)}
                  >
                    Comment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Comment Modal */}
      {isCommentModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
              Add Comment
            </h2>
            <textarea
              className="w-full border rounded p-2 text-xs md:text-sm"
              rows="4"
              placeholder="Write your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div className="mt-3 md:mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white text-xs md:text-sm px-3 md:px-4 py-1 rounded"
                onClick={() => setCommentModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs md:text-sm px-3 md:px-4 py-1 rounded"
                onClick={handleCommentSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageContests;
