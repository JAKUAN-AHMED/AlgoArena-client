// Login.jsx

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { GrGoogle } from "react-icons/gr";

const Login = () => {
  const {LogIn,google}=useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate=useNavigate();
  const handleGoogleLogin = () => {
    google()
      .then((res) => {
        const user = res.user;
        if (user && !user.photoURL) {
          const name = user.displayName;
          const photo = user.photoURL;
          profile(user, name, photo).then(() => {
            navigate("/");
            Swal.fire({
              title: "successfully Login",
              icon: "success",
            });
          });
        }
      })
      .catch((error) => console.log(error.message));
  };
  const onSubmit = (data) => {
    reset();
    //login
    const email=data.email;
    const password=data.password;
    LogIn(email,password).then((result)=>
    {
      const user=result.user;
       Swal.fire({
         position: "top",
         icon: "success",
         title: "Login Successfully",
         showConfirmButton: true,
         timer: 1500,
       });
       navigate('/');
    })
    .catch(error=>console.log(error.message));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-indigo-500 hover:underline">
              Register
            </Link>
            <div className="divider divide-rose-900">or</div>
            <div onClick={handleGoogleLogin} className="flex items-center justify-center font-bold">
              <button className="border flex items-center justify-center gap-2 rounded-lg shadow-lg p-2  ">
                <GrGoogle></GrGoogle> <span>Sign in with Google</span>
              </button>
            </div>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <Link to="/" className="text-indigo-500 hover:underline">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
