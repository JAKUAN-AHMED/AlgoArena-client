import img1 from "../../../assets/c.jpg";
import img2 from "../../../assets/s4.jpg";
import img3 from "../../../assets/s2.jpg";
const FeaturedSection = () => {
  // Sample data for featured contests
  const featuredContests = [
    {
      id: 1,
      name: "Exclusive Code Challenge",
      description:
        "Participate in our exclusive code challenge and win amazing prizes! Hone your coding skills and compete with the best.",
      date: "Dec 15, 2024",
      participantsCount: 500,
      image: img1,
    },
    {
      id: 2,
      name: "Winter Hackathon",
      description:
        "Join our winter hackathon to create innovative solutions and network with fellow tech enthusiasts!",
      date: "Jan 5, 2025",
      participantsCount: 750,
      image: img2,
    },
    {
      id: 3,
      name: "AI Innovation Sprint",
      description:
        "Explore the future of AI by participating in this innovation sprint. Work on real-world problems and showcase your skills!",
      date: "Feb 20, 2025",
      participantsCount: 320,
      image: img3,
    },
  ];

  return (
    <div className="bg-white py-10 px-6 mt-12">
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Featured Contests
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredContests.map((contest) => (
          <div
            key={contest.id}
            className="bg-gray-100 shadow-lg rounded-lg overflow-hidden transition hover:shadow-2xl"
          >
            <img
              src={contest.image}
              alt={contest.name}
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3">{contest.name}</h3>
              <p className="text-gray-700 mb-4">
                {contest.description.replace.length > 100
                  ? `${contest.description.slice(0, 100)}`
                  : contest.description}
              </p>
              <p className="text-gray-500 mb-2">
                <strong>Date:</strong>
                {contest.date}
              </p>
              <p className="text-gray-500 mb-6">
                <strong>Participants:</strong> {contest.participantsCount}
              </p>
              <button className="btn btn-primary w-full">Join Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
