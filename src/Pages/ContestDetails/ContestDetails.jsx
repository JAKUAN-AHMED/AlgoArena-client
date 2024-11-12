import { useState, useEffect } from "react";
import { useParams} from "react-router-dom"; // Import necessary hooks
import dayjs from "dayjs";
import useContests from "../../Hooks/useContests";

const ContestDetails = () => {
  const { id } = useParams(); // Get the contest id from the URL
  const [contests]=useContests();
  const contest=contests.find(c=>c._id===id);

  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    if (!contest || !contest.deadline) return; // If contest or deadline is not available

    const deadlineDate = dayjs(contest.deadline); // Parse the deadline

    // Check if the deadline is valid
    if (!deadlineDate.isValid()) {
      setTimeRemaining("Invalid deadline");
      return;
    }

    const interval = setInterval(() => {
      const now = dayjs(); // Get current time
      const diff = deadlineDate.diff(now, "second"); // Calculate the difference in seconds

      if (diff > 0) {
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`); // Update the countdown
      } else {
        setTimeRemaining("Expired"); // If the deadline is passed
        clearInterval(interval); // Clear the interval when expired
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [contest]); // Re-run this effect if the contest data changes

  if (!contest) {
    return <p>Contest not found</p>; // In case no contest data is available
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <img
        src={contest.contestImage} // Updated to use contest.contestImage
        alt={contest.contestName}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{contest.contestName}</h1>
      <p className="text-gray-600 mb-2">
        Participants: {contest.participants || "1230"}
      </p>
      <p className="text-gray-700 mb-4">{contest.contestDescription}</p>
      <p className="font-semibold mb-4">prizeMoney: {contest.prizeMoney}</p>
      <p className="font-semibold mb-4">
        Deadline: <span className="text-blue-500">{timeRemaining}</span>
      </p>
    </div>
  );
};

export default ContestDetails;
