import React, { useState } from "react";
import { Link } from "react-router-dom";
import useContests from "../../../Hooks/useContests";

const PopularContest = () => {
  const [contests] = useContests(); // Get contests from hook
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [currentPage, setCurrentPage] = useState(1); // State for current page

  const contestsPerPage = 6; // Number of contests per page
  const filteredContests = contests.filter((contest) =>
    contest.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredContests.length / contestsPerPage); // Total pages

  // Get contests for the current page
  const currentContests = filteredContests.slice(
    (currentPage - 1) * contestsPerPage,
    currentPage * contestsPerPage
  );

  // Handle pagination button click
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-gray-100 min-h-screen mt-16 p-6">
      <h2 className="text-2xl font-bold mb-2">Popular Contests</h2>

      {/* Search and Show All Button */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search contest by tag..."
          className="input input-bordered w-full max-w-md mr-4"
          value={searchQuery} // Controlled input
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
        />
        <Link to={"/allContest"}>
          <button className="w-[130px] h-[50px] border rounded shadow-md bg-blue-600 text-white">
            Show All Contest
          </button>
        </Link>
      </div>

      {/* Display Contests */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentContests.length > 0 ? (
          currentContests.map((contest) => (
            <div
              key={contest._id}
              className="card bg-white shadow-lg p-4 rounded-lg hover:shadow-xl transition"
            >
              <img
                src={contest.contestImage}
                alt={contest.contestName}
                className="w-full h-48 object-cover bg-center bg-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold mb-2">{contest.contestName}</h3>
              <p className="text-gray-600 text-sm mb-2">
                {contest.contestDescription.length > 100
                  ? `${contest.contestDescription.slice(0, 100)}...`
                  : contest.contestDescription}
              </p>
              <p className="text-gray-600 font-medium">
                Participants: {contest?.participant || "0"}
              </p>
              <p className="text-gray-600  mb-4">
                Tag: {contest?.tag}
              </p>
              <Link to={`/contestDetails/${contest._id}`}>
                <button className="btn btn-primary w-full">View Details</button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-600 col-span-full text-center">
            No contests found for "{searchQuery}"
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <button
          className="btn btn-outline mr-2"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="flex items-center justify-center px-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PopularContest;
