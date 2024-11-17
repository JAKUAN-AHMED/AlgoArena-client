import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";


const TaskSubmit = () => {
  const [pdfLink, setPdfLink] = useState("");
  const { tranId } = useParams(); 
  const axiosPublic = useAxiosPublic();
  console.log("transaction",tranId);
  const handleInputChange = (e) => {
    setPdfLink(e.target.value);
  };

  const handleSubmit = () => {
    console.log("PDF Link Submitted:", pdfLink);
    axiosPublic
      .patch(`/payment-history/${tranId}`, { pdfLink: pdfLink })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "You submitted the task successfully",
            icon: "success",
          });
        }
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <FaCheckCircle className="text-green-500 text-6xl mr-4" />
          <h2 className="text-3xl font-semibold text-green-600">
            Payment Successful
          </h2>
        </div>

        <p className="text-gray-700 text-center mb-6">
          Your payment has been successfully processed. Please submit the PDF
          link for your task.
        </p>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="pdfLink"
              className="block text-lg font-medium text-gray-700"
            >
              PDF Link
            </label>
            <input
              type="url"
              id="pdfLink"
              value={pdfLink}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your PDF link"
              required
            />
          </div>

          <div>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskSubmit;
