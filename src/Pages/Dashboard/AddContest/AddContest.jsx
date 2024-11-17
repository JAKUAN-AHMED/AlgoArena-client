import { useForm } from "react-hook-form";
import { Listbox } from "@headlessui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useUsers from "../../../Hooks/useUsers";

const AddContest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm();

  const axiosPublic = useAxiosPublic();
  const {User,loading}=useAuth();
  // const {email}=User;
  const [users,loading2]=useUsers();
  const finduser=users.find(us=>us?.email===User?.email);

  const [selectedTag, setSelectedTag] = useState("Coding Contest");
  const [deadline, setDeadline] = useState(null);

  // Tags for the dropdown menu
  const tags = [
    "Image Design Contests",
    "Article Writing",
    "Marketing Strategy",
    "Digital Advertisement Contests",
    "Gaming Review",
    "Book Review",
    "Business Idea Contests",
    "Movie Review",
  ];

  // Fetch API key from environment variables
  const image_hoisting_key = import.meta.env.VITE_IMAGE_HOISTING_KEY;
  const image_hoisting_api = `https://api.imgbb.com/1/upload?key=${image_hoisting_key}`;

  // Handle form submission
  const onSubmit = async (data) => {
    // Upload an image to imgbb and get a URL
    const imageFile = { image: data.contestImage[0] };
    const res = await axiosPublic.post(image_hoisting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      // Send the form data to the server
      const formData = {
        contestName: data.contestName,
        contestImage: res.data.data.url,
        contestDescription: data.contestDescription,
        entryFee: data.entryFee,
        prizeMoney: data.prizeMoney, // Use prizeMoney instead of individual prizes
        submissionInstructions: data.submissionInstructions,
        tag: selectedTag,
        deadline: deadline,
        status:'Pending',
        email:User?.email,
      };

      const formRes = await axiosPublic.post("/contests", formData);
      if (formRes.data.insertedId) {
        Swal.fire({
          title: `${data.contestName} is added to contests`,
          icon: "success",
        });
      }
    }
  };
  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Add Contest
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Contest Name */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Contest Name
          </label>
          <input
            type="text"
            {...register("contestName", {
              required: "Contest name is required",
            })}
            placeholder="Enter contest name"
            className="mt-2 p-2 border rounded w-full"
          />
          {errors.contestName && (
            <p className="text-red-500 text-sm">{errors.contestName.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Contest Image
          </label>
          <input
            type="file"
            {...register("contestImage", {
              required: "Contest image is required",
            })}
            className="mt-2 p-2 border rounded w-full"
          />
          {errors.contestImage && (
            <p className="text-red-500 text-sm">
              {errors.contestImage.message}
            </p>
          )}
        </div>

        {/* Contest Description */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Contest Description
          </label>
          <textarea
            {...register("contestDescription", {
              required: "Description is required",
            })}
            placeholder="Provide contest details"
            className="mt-2 p-2 border rounded w-full h-24"
          />
          {errors.contestDescription && (
            <p className="text-red-500 text-sm">
              {errors.contestDescription.message}
            </p>
          )}
        </div>

        {/* Entry Fee */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Entry Fee (USD)
          </label>
          <input
            type="number"
            {...register("entryFee", { required: "Entry fee is required" })}
            placeholder="Enter entry fee"
            className="mt-2 p-2 border rounded w-full"
          />
          {errors.entryFee && (
            <p className="text-red-500 text-sm">{errors.entryFee.message}</p>
          )}
        </div>

        {/* Prize Money */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Prize Money
          </label>
          <input
            type="text"
            {...register("prizeMoney", {
              required: "Prize money is required",
            })}
            placeholder="Enter prize money"
            className="mt-2 p-2 border rounded w-full"
          />
          {errors.prizeMoney && (
            <p className="text-red-500 text-sm">{errors.prizeMoney.message}</p>
          )}
        </div>

        {/* Submission Instructions */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Task Submission Instructions
          </label>
          <textarea
            {...register("submissionInstructions", {
              required: "Submission instructions are required",
            })}
            placeholder="Describe what participants need to submit"
            className="mt-2 p-2 border rounded w-full h-24"
          />
        </div>

        {/* Contest Tag */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Contest Type/Tag
          </label>
          <Listbox value={selectedTag} onChange={setSelectedTag}>
            <Listbox.Button className="mt-2 w-full text-left p-2 border rounded bg-white shadow-sm">
              {selectedTag}
            </Listbox.Button>
            <Listbox.Options className="mt-2 border rounded shadow-lg bg-white">
              {tags.map((tag) => (
                <Listbox.Option
                  key={tag}
                  value={tag}
                  className="p-2 hover:bg-blue-100"
                >
                  {tag}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>

        {/* Contest Deadline */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Contest Deadline
          </label>
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            dateFormat="MMMM d, yyyy"
            className="mt-2 p-2 border rounded w-full"
          />
        </div>

        <div className="flex justify-center mt-6">
          {finduser?.blocked ? (
            <>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-blue-700"
              >
                U cant't add Contest u blocked bY Admin
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Contest
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddContest;
