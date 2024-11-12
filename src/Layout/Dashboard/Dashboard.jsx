import {
  FaBars,
  FaBook,
  FaCalendarAlt,
  FaCalendarCheck,
  FaEnvelope,
  FaHome,
  FaShoppingCart,
  FaStar,
  FaStore,
  FaUsers,
} from "react-icons/fa";
import { ImSpoonKnife } from "react-icons/im";
import { IoIosList } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../../Hooks/useRole";

const Dashboard = () => {
  const [isAdmin,isCreator]=useRole();
  return (
    <div className="flex font-cinzel">
      {/* dashboard sidebar */}
      <div className="w-1/4 min-h-screen font-jost bg-orange-400 text-gray-800">
        <ul className="space-y-2 px-2">
          {isAdmin ? (
            <>
              <li className="border-2 border-yellow-300 rounded-xl lg:shadow-xl mt-2 text-start pl-2 text-[10px] lg:text-xl">
                <NavLink
                  to={"/dashboard/manageUser"}
                  className="flex items-center gap-1 text-[8px] lg:text-xl"
                >
                  <span>
                    <FaHome></FaHome>{" "}
                  </span>{" "}
                  Manage User
                </NavLink>
              </li>
              <li className="border-2 border-yellow-300 rounded-xl lg:shadow-xl mt-2 text-start pl-2 text-[10px] lg:text-xl">
                <NavLink
                  to={"/dashboard/manageContests"}
                  className="flex items-center gap-1"
                >
                  <ImSpoonKnife /> Manage Contests
                </NavLink>
              </li>
            </>
          ) : (
            <>
              {isCreator ? (
                <>
                  <li className="border-2 border-yellow-300 rounded-xl lg:shadow-xl mt-2 text-start pl-2 text-[10px] lg:text-xl">
                    <NavLink
                      to="/dashboard/addContest"
                      className="flex items-center gap-1 text-[8px] lg:text-xl"
                    >
                      <FaHome></FaHome>
                      Add Contest
                    </NavLink>
                  </li>
                  <li className="border-2 border-yellow-300 rounded-xl lg:shadow-xl mt-2 text-start pl-2 text-[10px] lg:text-xl">
                    <NavLink
                      to={"/dashboard/myCreatedContest"}
                      className="flex items-center gap-1 text-[8px] lg:text-xl"
                    >
                      <span>
                        <FaCalendarAlt></FaCalendarAlt>{" "}
                      </span>{" "}
                      My Created Contests
                    </NavLink>
                  </li>
                  <li className="border-2 border-yellow-300 rounded-xl lg:shadow-xl mt-2 text-start pl-2 text-[10px] lg:text-xl">
                    <NavLink
                      to={"/dashboard/submittedContests"}
                      className="flex items-center gap-1"
                    >
                      <FaShoppingCart /> Contest Submitted Page
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="border-2 border-yellow-300 rounded-xl lg:shadow-xl mt-2 text-start pl-2 text-[10px] lg:text-xl">
                    <NavLink
                      to={"/dashboard/participated"}
                      className="flex items-center gap-1"
                    >
                      <FaStar></FaStar> My Participated Contest
                    </NavLink>
                  </li>
                  <li className="border-2 border-yellow-300 rounded-xl lg:shadow-xl mt-2 text-start pl-2 text-[10px] lg:text-xl">
                    <NavLink
                      to={"/dashboard/winnersPage"}
                      className="flex items-center gap-1"
                    >
                      <span>
                        <FaCalendarCheck></FaCalendarCheck>
                      </span>
                      My Winning Contest Page:
                    </NavLink>
                  </li>
                </>
              )}
            </>
          )}
          {/* divider here shared Navlinks */}
          <div className="divider"></div>
          <li className="border-2 border-yellow-300 rounded-xl lg:shadow-xl mt-2 text-start pl-2 text-[10px] lg:text-xl">
            <NavLink to={"/"} className="flex items-center gap-1">
              <FaHome></FaHome> Home
            </NavLink>
          </li>
          <li className="border-2 border-yellow-300 rounded-xl lg:shadow-xl mt-2 text-start pl-2 text-[10px] lg:text-xl">
            <NavLink to={"/allContest"} className="flex items-center gap-1">
              <FaBars></FaBars>All Contest
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard contents */}
      <div className="w-3/4">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
