import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get id from URL
import dayjs from "dayjs";
import img1 from "../../assets/c.jpg";
import img2 from "../../assets/c1.jpg";
import img3 from "../../assets/c2.jpg";
import img4 from "../../assets/c3.jpg";
import img5 from "../../assets/c4.jpg";

const contests = [
  {
    id: 1,
    name: "Photography Contest",
    image: img1,
    participants: 120,
    description: "Showcase your photography skills.",
    details: "Capture landscapes, portraits, and more.",
    prize: "$500 cash prize",
    winner: { name: "", image: "" },
    deadline: "2024-12-15T23:59:59",
  },
  {
    id: 2,
    name: "Coding Challenge",
    image: img2,
    participants: 75,
    description: "Solve coding problems.",
    details: "Various coding challenges.",
    prize: "$1000 prize",
    winner: { name: "", image: "" },
    deadline: "2024-11-30T23:59:59",
  },
  {
    id: 3,
    name: "Art Competition",
    image: img3,
    participants: 45,
    description: "Artistic skills contest.",
    details: "Create unique art pieces.",
    prize: "$300 art supplies",
    winner: { name: "", image: "" },
    deadline: "2024-12-10T23:59:59",
  },
  {
    id: 4,
    name: "Design Competition",
    image: img4,
    participants: 30,
    description: "Design competition.",
    details: "Innovative designs.",
    prize: "$700 design tools",
    winner: { name: "", image: "" },
    deadline: "2024-11-20T23:59:59",
  },
  {
    id: 5,
    name: "Literature Contest",
    image: img5,
    participants: 20,
    description: "Literary skills contest.",
    details: "Write creative pieces.",
    prize: "Publishing opportunity",
    winner: { name: "", image: "" },
    deadline: "2024-12-05T23:59:59",
  },
];

const ContestDetails = () => {
  const { id } = useParams(); // Get id from URL
  const contest = contests.find((c) => c.id === parseInt(id)); // Find contest by id

  const [participants, setParticipants] = useState(contest.participants);
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const deadlineDate = dayjs(contest.deadline);
    const interval = setInterval(() => {
      const now = dayjs();
      const diff = deadlineDate.diff(now, "second");
      if (diff > 0) {
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeRemaining("not available");
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [contest.deadline]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <img
        src={contest.image}
        alt={contest.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{contest.name}</h1>
      <p className="text-gray-600 mb-2">Participants: {participants}</p>
      <p className="text-gray-800 mb-4">{contest.description}</p>
      <p className="text-gray-700 mb-4">{contest.details}</p>
      <p className="font-semibold mb-4">Prize: {contest.prize}</p>
      <p className="font-semibold mb-4">
        Deadline: <span className="text-blue-500">{timeRemaining}</span>
      </p>
    </div>
  );
};

export default ContestDetails;
