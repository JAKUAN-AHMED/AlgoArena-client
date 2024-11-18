import React, { useState } from "react";
import useCreatorContest from "../../../Hooks/useCreatorContest";
import { useNavigate } from "react-router-dom";
import useRole from "../../../Hooks/useRole";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const MyContestPage = () => {
  const [contestData,refetch] = useCreatorContest();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContest, setSelectedContest] = useState(null);
  const navigate = useNavigate();
  const [isCreator] = useRole();
  const axiosPublic=useAxiosPublic();

  // Example admin comments, you would likely fetch these from your database
  const adminComments = {
    contest1_id: "This contest needs some updates before approval.",
    contest2_id: "Approved. Please proceed with the next steps.",
    contest3_id: "Review required before confirming.",
  };

  // Handle delete contest
  const handleDelete = async(contestId) => {
    const res=await axiosPublic.delete(`/contests/delete/${contestId}`);
    if(res.data.deletedCount>0)
    {
      Swal.fire({
        title:'deleted contests ! Reload to see remain contest',
        icon:"success"
      })
      window.location.reload();
    }
    
  };

  // Handle open edit modal
  const handleEdit = (contest) => {
    setSelectedContest(contest);
    setIsModalOpen(true);
  };

  // Handle see submissions
  const handleSeeSubmissions = (contestId) => {
    alert(`Redirecting to submissions for contest with ID: ${contestId}`);
    navigate("/dashboard/submittedContests");
  };

  // Handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContest(null);
  };

  // Handle input change in modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedContest((prevContest) => ({
      ...prevContest,
      [name]: value,
    }));
  };

  // edit contest
  const handleSave = () => {
    axiosPublic.put(`/contests/update/${selectedContest._id}`,selectedContest)
      .then((res) => {
        refetch();
        closeModal();
        if(res.data.modifiedCount>0)
        {
          Swal.fire({
            title: "Contest updated successfully",
            icon: "success",
          });
        }
      })
      .catch((error) => console.error("Error updating contest:", error));
  };

  return (
    <div className="font-jost p-4">
      <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-bold mb-5">
        My Contests
      </h1>

      <div className="p-4 overflow-scroll">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border p-2 text-xs md:text-sm lg:text-base">
                Contest Name
              </th>
              <th className="border p-2 text-xs md:text-sm lg:text-base">
                Description
              </th>
              <th className="border p-2 text-xs md:text-sm lg:text-base">
                Status
              </th>
              <th className="border p-2 text-xs md:text-sm lg:text-base">
                Actions
              </th>
              <th className="border p-2 text-xs md:text-sm lg:text-base">
                Admin Comments
              </th>
            </tr>
          </thead>
          <tbody>
            {contestData.map((contest) => (
              <tr key={contest._id} className="text-center">
                <td className="border p-2">{contest.contestName}</td>
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
                <td className="border p-2 flex justify-center">
                  {contest.status === "Pending" ? (
                    <>
                      <button
                        onClick={() => handleEdit(contest)}
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
                <td className="border p-2">
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

      {/* Modal for Editing Contest */}
      {isModalOpen && selectedContest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-scroll z-50 p-4 sm:p-6 md:p-8">
          <div className="bg-white p-6 rounded-lg w-full sm:w-10/12 md:w-8/12 lg:w-1/2 mx-auto max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
              Edit Contest
            </h2>
            <div className="space-y-3">
              <label>
                Contest Name:
                <input
                  type="text"
                  name="contestName"
                  value={selectedContest.contestName}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </label>
              <label>
                Contest Image:
                <input
                  type="text"
                  name="contestImage"
                  value={selectedContest.contestImage}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </label>
              <label>
                Description:
                <input
                  type="text"
                  name="contestDescription"
                  value={selectedContest.contestDescription}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </label>
              <label>
                Entry Fee:
                <input
                  type="number"
                  name="entryFee"
                  value={selectedContest.entryFee}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </label>
              <label>
                Prize Money:
                <input
                  type="number"
                  name="prizeMoney"
                  value={selectedContest.prizeMoney}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </label>
              <label>
                Submission Instructions:
                <textarea
                  name="submissionInstructions"
                  value={selectedContest.submissionInstructions}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </label>
              <label>
                Tag:
                <input
                  type="text"
                  name="tag"
                  value={selectedContest.tag}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </label>
              
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyContestPage;
