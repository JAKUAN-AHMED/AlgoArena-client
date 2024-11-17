import { useState, useEffect } from "react";
import img1 from '../../../assets/c.jpg';
import img2 from '../../../assets/c4.jpg';
import img3 from '../../../assets/c3.jpg';
import img4 from '../../../assets/c2.jpg';
// Assuming you have a contest data array like this
const contestData = [
  {
    name: "Alice Doe",
    image: img1,
    contestName: "Ultimate Coding Challenge",
    description:
      "An exciting coding challenge with prizes for the top 3 winners.",
    participationCount: 5000,
  },
  {
    name: "Bob Smith",
    image: img2,
    contestName: "Hackathon 2024",
    description: "Solve real-world problems with innovative solutions.",
    participationCount: 4500,
  },
  {
    name: "Charlie Johnson",
    image: img3,
    contestName: "Design Sprint",
    description: "A design-focused contest to create the best product UI/UX.",
    participationCount: 4000,
  },
  {
    name: "Dave Williams",
    image: img4,
    contestName: "Game Development Challenge",
    description: "Create the most innovative game concept within 48 hours.",
    participationCount: 3000,
  },
];

const BestContestCreatorsSection = () => {
  // Sort contests by participation count in descending order and pick top 3
  const sortedContests = [...contestData]
    .sort((a, b) => b.participationCount - a.participationCount)
    .slice(0, 3);

  return (
    <div className="best-contest-creators-section py-12 px-6 bg-gradient-to-r from-green-500 to-blue-500 text-white mt-16">
      <h2 className="text-3xl font-bold text-center mb-8">
        Top Contest Creators
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {sortedContests.map((contest, index) => (
          <div
            key={index}
            className="contest-card bg-white text-black rounded-lg shadow-lg overflow-hidden relative hover:scale-105 transition-transform duration-500"
          >
            <div
              className="image-container relative w-full h-64 bg-cover bg-center"
              style={{ backgroundImage: `url(${contest.image})` }}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                {contest.contestName}
              </h3>
              <p className="text-gray-700 mb-4">{contest.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Participants</span>
                <p className="text-2xl text-blue-600 font-bold">
                  {contest.participationCount}
                </p>
              </div>
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold">{contest.name}</p>
                <img
                  src={contest.image}
                  alt={contest.name}
                  className="w-16 h-16 rounded-full mx-auto mt-2"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestContestCreatorsSection;
