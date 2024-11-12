import { useState } from "react";
import ContestCard from "../../Components/Card/ContestCard";
import useContests from "../../Hooks/useContests";

// AllContest Component
const AllContest = () => {
  const [contests] = useContests();
  const [selectedTab, setSelectedTab] = useState("All");

  const filterContests = () => {
    if (selectedTab === "All") return contests;
    return contests.filter((contest) => contest.tag === selectedTab);
  };

  const contestTypes = [
    "All",
    ...new Set(contests.map((contest) => contest.tag)),
  ];

  return (
    <div className="all-contests">
      {/* Dropdown for sm and md, Tabs for lg and above */}
      <div className="tabs flex justify-center mb-4">
        {/* Dropdown for sm and md screens */}
        <select
          className="block lg:hidden px-2 py-1 mt-3 rounded border bg-gray-200 text-sm"
          value={selectedTab}
          onChange={(e) => setSelectedTab(e.target.value)}
        >
          {contestTypes.map((type, idx) => (
            <option key={idx} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* Tabs for lg and above */}
        <div className="hidden lg:flex space-x-2">
          {contestTypes.map((type, idx) => (
            <button
              key={idx}
              className={`tab px-2 text-[10px] lg:px-4 lg:py-2 lg:text-sm py-2 ${
                selectedTab === type ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setSelectedTab(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Contest Cards */}
      <div className="contest-list grid grid-cols-1 md:grid-cols-3 gap-4">
        {filterContests().map((contest) => (
          <ContestCard key={contest._id} contest={contest} />
        ))}
      </div>
    </div>
  );
};

export default AllContest;
