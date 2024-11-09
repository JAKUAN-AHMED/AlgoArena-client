import { Link } from "react-router-dom";

const ContestCard = ({ contest }) => {
  return (
    <div className="contest-card border p-4 m-2 rounded shadow-lg">
      <img
        src={contest.image}
        alt={contest.name}
        className="w-full h-40 object-cover rounded mb-4"
      />
      <h2 className="text-lg font-bold">{contest.name}</h2>
      <p>Participants: {contest.participants}</p>
      <p>{contest.description.slice(0, 50)}...</p>
      <Link to={`/allContest/${contest.id}`}>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Details
        </button>
      </Link>
    </div>
  );
};
export default ContestCard;