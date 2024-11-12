import { useState } from "react";
import { IoIosClose, IoIosMenu } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useRole from "../../../Hooks/useRole";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown,setDropDown]=useState(false);
  const { User,LogOut } = useAuth();
  const [isAdmin,isCreator]=useRole();
  const handleLogOut=()=>{
    LogOut()
    .then(()=>{
      Swal.fire({
        title: "Successfully Log Out",
        icon: "warning",
        showConfirmButton: true,
        timer: 1500,
      });
    })
    .catch(error=>console.log(error.message));
  }

  return (
    <section className="bg-slate-800 border rounded shadow-3xl text-white p-4 font-cinzel">
      <nav className="flex justify-between items-center mt-4 px-4">
        {/* phone view */}
        <div onClick={() => setOpen(!open)} className="md:hidden">
          <button>
            {open ? <IoIosClose size={24} /> : <IoIosMenu size={24} />}
          </button>
        </div>

        {/* website name */}
        <h2 className="text-base md:text-3xl font-bold text-yellow-200 text-start">
          AlgoArena
        </h2>
        <div className="md:hidden">
          {User && (
            <div className="relative">
              <img
                src={User?.photoURL || "photo"}
                alt={User?.displayName || "name"}
                onClick={() => setDropDown(!dropdown)}
                className="border rounded-full shadow-2xl w-[40px] h-[40px]"
              />

              {dropdown && (
                <div className="absolute z-10 text-black text-center right-0 border bg-white w-[200px] h-[100px]  rounded shadow-2xl p-4 text-[10px] font-bold">
                  <div className="flex gap-4 py-2">
                    <p>{User?.displayName}</p>
                    {isAdmin ? (
                      <>
                        <Link to={"/dashboard/manageUser"}>
                          <button className="bg-blue-400 border rounded shadow">
                            Dashboard
                          </button>
                        </Link>
                      </>
                    ) : (
                      <>
                        {isCreator ? (
                          <>
                            <Link to={"/dashboard/addContest"}>
                              <button className="bg-blue-400 border rounded shadow">
                                Dashboard
                              </button>
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link to={"/dashboard"}>
                              <button className="bg-blue-400 border rounded shadow">
                                Dashboard
                              </button>
                            </Link>
                          </>
                        )}
                      </>
                    )}
                  </div>
                  <div className="text-center ">
                    <button
                      className="border rounded shadow-2xl p-2 bg-orange-400"
                      onClick={handleLogOut}
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {/* desktop view */}
        <ul className="hidden  md:flex gap-8 md:gap-4 font-bold font-jost">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to={"/login"}>Login</NavLink>
          </li>
          <li className="lg:pr-[400px] md:pr-[200px]">
            <NavLink to={"/allContest"}>All Contest</NavLink>
          </li>
          {User && (
            <div className="relative">
              <img
                className="border rounded-full w-[40px] h-[40px] cursor-pointer"
                src={User?.photoURL}
                alt={User?.displayName}
                onClick={() => setDropDown(!dropdown)}
              />
              {/* Profile dropdown menu */}
              {dropdown && (
                <div className="absolute w-[250px] right-0 shadow-2xl border rounded bg-white text-black z-10 p-5 font-jost">
                  <li className="flex items-center justify-center gap-5">
                    <p className="text-sm">{User?.displayName}</p>
                    {isAdmin ? (
                      <>
                        <Link to={"/dashboard/manageUser"}>
                          <button className="border rounded shadow">
                            Dashboard
                          </button>
                        </Link>
                      </>
                    ) : (
                      <>
                        {isCreator ? (
                          <>
                            <Link to={"/dashboard/addContest"}>
                              <button className="bg-blue-400 border rounded shadow">
                                Dashboard
                              </button>
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link to={"/dashboard"}>
                              <button className="bg-blue-400 border rounded shadow">
                                Dashboard
                              </button>
                            </Link>
                          </>
                        )}
                      </>
                    )}
                  </li>
                  <li className="text-center p-4">
                    <button
                      className="border rounded bg-orange-400 shadow-2xl p-2"
                      onClick={handleLogOut}
                    >
                      Log Out
                    </button>
                  </li>
                </div>
              )}
            </div>
          )}
        </ul>
      </nav>

      {/* drop down menu for mobile */}
      {open && (
        <div className="md:hidden">
          <ul className="flex font-jost flex-col bg-gray-700 p-2 mt-2 rounded">
            <li className="py-1">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="py-1">
              <NavLink to={"/login"}>Login</NavLink>
            </li>
            <li className="py-1">
              <NavLink to={"/allContest"}>All Contest</NavLink>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default Navbar;
