import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth.jsx";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic.jsx";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { CreateUser, profile, google } = useAuth();
  const axiosPublic = useAxiosPublic();

  const postDataToTheServer = (dataInfo) => {
    axiosPublic
      .post("/users", dataInfo)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Successfully inserted data to the DB",
            icon: "success",
          });
        }
      })
      .catch((error) => console.log(error.message));
  };

  const handleGoogleLogin = () => {
    google()
      .then((res) => {
        const user = res.user;
        if (user) {
          const dataInfo = {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          };
          postDataToTheServer(dataInfo);
          profile(user, user.displayName, user.photoURL).then(() => {
            Swal.fire({
              title: "Successfully Registered",
              icon: "success",
            });
            navigate("/");
          });
        }
      })
      .catch((error) => console.log(error.message));
  };

  const onSubmit = (data) => {
    reset();
    const { email, password, name, photoURL } = data;
    const dataInfo = { name, email, photoURL };

    postDataToTheServer(dataInfo);

    CreateUser(email, password)
      .then((result) => {
        const user = result.user;
        profile(user, name, photoURL)
          .then(() => {
            Swal.fire({
              position: "top",
              icon: "success",
              title: "Registered Successfully",
              showConfirmButton: true,
              timer: 1500,
            });
            navigate("/login");
          })
          .catch((error) => console.log(error.message));
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800 p-4">
      <div className="w-full max-w-lg bg-gray-600 shadow-2xl rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Email address"
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1 relative">
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-500"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
            {errors.password && (
              <p className="text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-600">
              Photo URL
            </label>
            <input
              type="text"
              {...register("photoURL")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Link to your photo"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-white">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline">
              Login
            </Link>
            <div className="divider divide-rose-900">or</div>
            <div
              onClick={handleGoogleLogin}
              className="flex items-center justify-center font-bold"
            >
              <button className="border flex items-center justify-center gap-2 rounded-lg shadow-lg p-2  ">
                <FaGoogle></FaGoogle> <span>Sign in with Google</span>
              </button>
            </div>
          </p>
          <p className="text-sm text-white mt-2">
            <Link to="/" className="text-white hover:underline">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
