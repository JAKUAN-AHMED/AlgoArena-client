import useWinner from "../../../Hooks/useWinner.jsx";
import img1 from "../../../assets/CoverForPh.jpg";
import img2 from "../../../assets/c.jpg";
const AdvertisementSection = ({
  contestWinner = { name: "Jakuan Ahmed", image: img1 },
  participationCount = 1250,
  totalWinnersCount = 35,
  backgroundImage = img2,
  flowerImage = img2,
}) => {
  const [Winner]=useWinner();
  console.log(Winner);
  return (
    <div
      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-12 px-6 mt-12 mb-12"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <h2 className="text-3xl font-bold text-center mb-8">
        Join the Excitement!
      </h2>
      <div
        className="flower-animation absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: `url(${flowerImage})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          animation: "flowerBlow 6s infinite ease-in-out",
          position: "absolute",
          top: "0",
          left: "0",
        }}
      ></div>
      <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto gap-8">
        {/* Contest Overview */}
        <div className="bg-white text-black p-6 rounded-lg shadow-lg flex-1 text-center">
          <h3 className="text-xl font-semibold mb-4">Competition Overview</h3>
          <p className="text-gray-700 mb-2">Join thousands of participants!</p>
          <div className="flex justify-around mt-4">
            <div>
              <p className="text-4xl font-bold text-blue-600">
                {participationCount}
              </p>
              <p>Participants</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">
                {totalWinnersCount}
              </p>
              <p>Total Winners</p>
            </div>
          </div>
        </div>
        <div className="flex-1 text-center bg-white text-black p-6 rounded-lg shadow-lg">
          <img
            src={contestWinner.image}
            alt={`${Winner} - Contest Winner`}
            className="w-32 h-32 mx-auto rounded-full mb-4"
          />
          <h3 className="text-xl font-bold mb-2">
            Congratulations {Winner}!
          </h3>
          <p className="text-gray-700">
            Our latest contest winner. Will you be next?
          </p>
        </div>
        <div className="flex-1 text-center bg-white text-black p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Your Chance to Shine!</h3>
          <p className="text-gray-700 mb-4">
            Participate now for a chance to win amazing prizes and recognition.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Join the Contest
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementSection;
