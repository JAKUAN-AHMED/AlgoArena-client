import React from "react";
import useContests from "../../../Hooks/useContests";
import { Link } from "react-router-dom";

const FeaturedSection = () => {
  // Get contests using custom hook
  const [contests] = useContests();

  // Sort contests by participant count and take the top 3
  const featuredContests = contests
    .sort((a, b) => b.participant - a.participant) // Sort by descending participant count
    .slice(0, 3); // Get top 3 contests

  return (
    <div className="bg-white py-10 px-6 mt-12">
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Featured Contests
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredContests.map((contest) => (
          <div
            key={contest._id}
            className="bg-gray-100 shadow-lg rounded-lg overflow-hidden transition hover:shadow-2xl"
          >
            <img
              src={contest.contestImage}
              alt={contest.contestName}
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3">
                {contest.contestName}
              </h3>
              <p className="text-gray-700 mb-4">
                {contest.contestDescription.length > 100
                  ? `${contest.contestDescription.slice(0, 100)}...`
                  : contest.contestDescription}
              </p>
              <p className="text-gray-500 mb-2">
                <strong>Date:</strong> {contest.date}
              </p>
              <p className="text-gray-500 mb-6">
                <strong>Participants:</strong> {contest?.participant || "0"}
              </p>
              <Link to={`/contestDetails/${contest._id}`}>
                <button className="btn btn-primary w-full">Join Now</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
