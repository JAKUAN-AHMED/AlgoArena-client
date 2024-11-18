import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import useContests from "../../Hooks/useContests";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const ContestDetails = () => {
  const { id } = useParams();
  const [contests,refetch,loading1] = useContests();
  const contest = contests.find((c) => c._id === id);
  const axiosPublic=useAxiosPublic();
  const [timeRemaining, setTimeRemaining] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    if (!contest || !contest.deadline) return;
    const deadlineDate = dayjs(contest.deadline);
    if (!deadlineDate.isValid()) {
      setTimeRemaining("Invalid deadline");
      return;
    }
    const interval = setInterval(() => {
      const now = dayjs();
      const diff = deadlineDate.diff(now, "second");
      if (diff > 0) {
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeRemaining("Expired");
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [contest]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = () => {
    setShowModal(true);
  };

 

  const handlePayment = () => {
      const info=
      {
           contestId: contest._id,
            name: formData.name,
            email: formData.email,
            email1:contest.email,
            entryFee:contest.entryFee,
      }
      // Send registration data to the backend
      axiosPublic.post("/payment-history",info).then(res=>{
          
          window.location.replace(res.data.url)
        })
   
  };

 
 if(loading1){
  return <p>loading ....</p>;
 }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <img
        src={contest.contestImage}
        alt={contest.contestName}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{contest.contestName}</h1>
      <p className="text-gray-600 mb-2">
        Participants: {contest?.participant || "0"}
      </p>
      <p className="text-gray-700 mb-4">
        <span className="font-bold">Description</span> :
        {contest.contestDescription}
      </p>
      <p className="font-semibold mb-4">Prize Money: {contest.prizeMoney}</p>
      <p className="font-semibold mb-4">Entry Fee : {contest.entryFee}</p>
      <p className="mb-4">
        {" "}
        <span className="font-bold">Instruction</span> :{" "}
        {contest.submissionInstructions}
      </p>
      <p className="font-semibold mb-4">
        Deadline: <span className="text-blue-500">{timeRemaining}</span>
      </p>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={handleRegister}
      >
        Register for Contest
      </button>

      {/* Modal for registration */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">
              Register for {contest.contestName}
            </h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="bg-green-500 text-white p-2 rounded-md w-full "
                  onClick={handlePayment}
                >
                  Pay & Register
                </button>
              </div>
            </form>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestDetails;
