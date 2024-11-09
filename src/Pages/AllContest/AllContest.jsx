import { useState } from "react";
import ContestCard from "../../Components/Card/ContestCard";
import img1 from '../../assets/c.jpg';
import img2 from '../../assets/c1.jpg';
import img3 from '../../assets/c2.jpg';
import img4 from '../../assets/c3.jpg';
import img5 from '../../assets/c4.jpg';
// AllContest Component
const AllContest = () => {
  const contests = [
    {
      id: 1,
      name: "Photography Contest",
      image: img1,
      participants: 120,
      description: "A photography contest to showcase your skills.",
      type: "Photography",
    },
    {
      id: 2,
      name: "Coding Challenge",
      image: img2,
      participants: 75,
      description: "Solve complex coding problems to win exciting prizes.",
      type: "Programming",
    },
    {
      id: 3,
      name: "Art Competition",
      image: img3,
      participants: 45,
      description: "Unleash your creativity in our art competition!",
      type: "Art",
    },
    {
      id: 4,
      name: "Design Competition",
      image: img4,
      participants: 30,
      description: "A design competition for innovative thinkers.",
      type: "Design",
    },
    {
      id: 5,
      name: "Literature Contest",
      image: img5,
      participants: 20,
      description: "Showcase your literary skills.",
      type: "Literature",
    },
  ];

  const [selectedTab, setSelectedTab] =useState("All");
  const filterContests = () => {
    if (selectedTab === "All") return contests;
    return contests.filter((contest) => contest.type === selectedTab);
  };

  const contestTypes = [
    "All",
    ...new Set(contests.map((contest) => contest.type)),
  ];

  return (
    <div className="all-contests">
      {/* Tab Navigation */}
      <div className="tabs flex justify-center mb-4">
        {contestTypes.map((type) => (
          <button
            key={type}
            className={`tab px-2 text-[10px] md:px-4 md:py-2 md:text-sm py-2 ${
              selectedTab === type ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedTab(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Contest Cards */}
      <div className="contest-list grid grid-cols-1 md:grid-cols-3 gap-4">
        {filterContests().map((contest) => (
          <ContestCard key={contest.id} contest={contest} />
        ))}
      </div>
    </div>
  );
};

export default AllContest;
