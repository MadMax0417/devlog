import { NavLink, useNavigate } from "react-router";
import useLoggedInStore from "../stores/isLoggedInStore";

const Navbar = () => {
  //TO-DO: add global state
  const isLoggedIn = useLoggedInStore((state) => state.isLoggedIn);

  const navigate = useNavigate();

  const navigateTo = (destination: string) => {
    navigate(destination);
  };
  return (
    <nav className="flex-center top-0 sticky px-6 md:px-14 pt-5 pb-3 justify-between shadow-lg bg-[#FAF9F6]">
      {/* The logo with custom font */}
      <div
        className="baloo text-4xl lg:text-5xl hover:text-gray-500 cursor-pointer transition-all duration-100"
        onClick={() => {
          navigateTo("/");
        }}
      >
        DevLog
      </div>

      {/* Conditional rendering based on whether it is logged in*/}
      <div className="flex-center gap-x-6 md:gap-x-10 px-1">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "hover:scale-110 text-gray-500 transition-all duration-200"
              : "hover:scale-110 hover:text-gray-500 transition-all duration-200"
          }
          to="/"
        >
          Home
        </NavLink>
        {isLoggedIn ? (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "hover:scale-110 text-gray-500 hover:text-black transition-all duration-200"
                : "hover:scale-110 hover:text-gray-500 transition-all duration-200"
            }
            to={"/dashboard"}
          >
            Dashboard
          </NavLink>
        ) : (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "hover:scale-110 text-gray-500 hover:text-black transition-all duration-200"
                : "hover:scale-110 hover:text-gray-500 transition-all duration-200"
            }
            to={"/signin"}
          >
            Log In
          </NavLink>
        )}

        {!isLoggedIn && (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "hover:scale-110 text-gray-500 hover:text-black transition-all duration-200"
                : "hover:scale-110 hover:text-gray-500 transition-all duration-200"
            }
            to={"/signup"}
          >
            Sign Up
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
