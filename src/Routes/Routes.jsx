import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home/Home";
import NotFound from "../Pages/NotFound/NotFound";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllContest from "../Pages/AllContest/AllContest";
import ContestDetails from "../Pages/ContestDetails/ContestDetails";
import Dashboard from "../Layout/Dashboard/Dashboard";

const router=createBrowserRouter([
    {
        path:'',
        element:<Main></Main>,
        errorElement:<NotFound></NotFound>,
        children:[
            {
                path:'/',
                element:<Home></Home>,
            },
            {
                path:'/login',
                element:<Login></Login>,
            }
            ,
            {
                path:'/register',
                element:<Register></Register>,
            },
            {
                path:'/allContest',
                element:<AllContest/>
            },
            {
                path:'/allContest/:id',
                element:<ContestDetails/>
            }
        ]
    },
    {
        path:'/dashboard',
        element:<Dashboard></Dashboard>,
        // children:[
        //     {
        //         path:'/dashboard/manageUser',
        //         element:<ManageUser></ManageUser>
        //     }
        // ]
    }
])

export default router;