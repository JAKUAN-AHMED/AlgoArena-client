import { useState } from "react";
import { IoIosClose, IoIosMenu } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [open,setOpen]=useState(false);
    return (
      <section className="bg-slate-800 border rouned shadow-3xl text-white p-4 font-cinzel">
        <nav className="flex  justify-between items-center mt-4 px-4">
          <h2 className="text-base md:text-3xl font-bold text-yellow-200 text-start">AlgoArena</h2>

          {/* desktop view */}
          <ul className="hidden md:flex gap-8 md:gap-4 font-bold font-jost">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to={"/login"}>Login</NavLink>
            </li>
            <li className="lg:pr-[200px]">
              <NavLink to={"/all_contest"}>All Contest</NavLink>
            </li>
            <li className="md:pl-32 lg:pl-32">
              <NavLink to={"/nothing"}>Profile</NavLink>
            </li>
          </ul>

          {/* phone view */}
          <div onClick={() => setOpen(!open)} className="md:hidden">
            <button>
              {open ? <IoIosClose size={24}/>: <IoIosMenu size={24}/> }
            </button>
          </div>
        </nav>

        {/* drop downmenu for mobile */}
        {open && (
          <div className="md:hidden">
            <ul className="flex flex-col bg-gray-700 p-2 mt-2 rounded">
              <li className="py-1">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="py-1">
                <NavLink to={"/login"}>Login</NavLink>
              </li>
              <li className="py-1">
                <NavLink to={"/all_contest"}>All Contest</NavLink>
              </li>
              <li className="py-1">
                <NavLink to={"/nothing"}>Nothing</NavLink>
              </li>
            </ul>
          </div>
        )}
      </section>
    );
};

export default Navbar;