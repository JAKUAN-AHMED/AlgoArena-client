import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img1 from "../../../assets/c1.jpg";
import img2 from "../../../assets/c2.jpg";
import img3 from "../../../assets/c3.jpg";
import img4 from "../../../assets/c4.jpg";
import img5 from "../../../assets/c.jpg";

const images = [img1, img2, img3, img4, img5];
const PopularContest = () => {
  // Sample manual data for contests
  const contests = [
    {
      id: 1,
      name: "Contest One",
      description: "This is a short description of Contest One.",
      participantsCount: 150,
      image: img1, // Replace with actual image URL
    },
    {
      id: 2,
      name: "Contest Two",
      description: "This is a short description of Contest Two.",
      participantsCount: 200,
      image: img2,
    },
    {
      id: 3,
      name: "Contest Three",
      description: "This is a short description of Contest Three.",
      participantsCount: 250,
      image: img3,
    },
    {
      id: 4,
      name: "Contest Four",
      description: "This is a short description of Contest Four.",
      participantsCount: 300,
      image: img4,
    },
    {
      id: 5,
      name: "Contest Five",
      description: "This is a short description of Contest Five.",
      participantsCount: 350,
      image: img5,
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen mt-16 p-6">
      <h2 className="text-2xl font-bold mb-2">Popular Contests</h2>
      {/* filter and show all button */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search contest by tag..."
          className="input input-bordered w-full max-w-md mr-4"
        />
        <Link to={"/allContest"}>
          <button className="w-[130px] h-[50px] border rounded shadow-md bg-blue-600 text-white">
            Show All Contest
          </button>
        </Link>
      </div>

      {/* data showing and cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contests.map((contest) => (
          <div
            key={contest.id}
            className="card bg-white shadow-lg p-4 rounded-lg hover:shadow-xl transition"
          >
            <img
              src={contest.image}
              alt={contest.name}
              className="w-full h-48 object-cover bg-center bg-cover rouned-md mb-4"
            />
            <h3 className="text-lg font-bold mb-2">{contest.name}</h3>
            <p className="text-gray-600 text-sm mb-2">
              {contest.description.length > 100
                ? `${contest.description.slice(0, 100)}`
                : contest.description}
            </p>
            <p className="text-gray-600 font-medium mb-4">
              Participants:{contest.participantsCount}
            </p>
            <button className="btn btn-primary w-full">View Details</button>
          </div>
        ))}
      </div>

      {/* pagination */}
      <div className="mt-8 flex justify-center">
        <button className="btn btn-outline mr-2">Previous</button>
        <button className="btn btn-outline ">Next</button>
      </div>
    </div>
  );
};

export default PopularContest;
