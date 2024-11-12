import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home/Home";
import NotFound from "../Pages/NotFound/NotFound";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllContest from "../Pages/AllContest/AllContest";
import ContestDetails from "../Pages/ContestDetails/ContestDetails";
import Dashboard from "../Layout/Dashboard/Dashboard";
import ManageUsers from "../Pages/Dashboard/ManageUser/ManageUsers";
import AddContest from "../Pages/Dashboard/AddContest/AddContest";
import MyContestPage from "../Pages/Dashboard/MyContestPage/MyContestPage";
import SubmittedContests from "../Pages/Dashboard/SubmittedContests/SubmittedContests";
import ManageContests from "../Pages/Dashboard/ManageContests/ManageContests";

const router = createBrowserRouter([
  {
    path: "",
    element: <Main></Main>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/allContest",
        element: <AllContest />,
      },
      {
        path: "/allContest/:id",
        element: <ContestDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/contests/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard/manageUser",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "/dashboard/addContest",
        element: <AddContest></AddContest>,
      },
      {
        path: "/dashboard/myCreatedContest",
        element: <MyContestPage></MyContestPage>,
      },
      {
        path: "/dashboard/submittedContests",
        element: <SubmittedContests></SubmittedContests>,
      },
      {
        path: "/dashboard/manageContests",
        element: <ManageContests></ManageContests>,
      },
    ],
  },
]);

export default router;