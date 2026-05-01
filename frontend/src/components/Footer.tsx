import { Link, useNavigate } from "react-router-dom";
import useLoggedInStore from "../stores/isLoggedInStore";


type navLinkType = {name: string, href:string}

const navLinks : navLinkType[] = [
  {name: "Home", href: "/"},
  {name: "About", href: "/#about"},
  {name: "Features", href: "/#features"},
]

const Footer = () => {
  const isLoggedIn = useLoggedInStore((state) => state.isLoggedIn);

  const navigate = useNavigate();



  return (
    <footer className="w-full bg-gray-900 h-[20vh] text-white flex-center justify-around">
      <div className="">
        {/* Logo (name) */}
        <div
          className="baloo text-4xl lg:text-5xl text-white hover:text-gray-500 cursor-pointer transition-all duration-100"
          onClick={() => {
            navigate("/");
          }}
        >
          DevLog
        </div>
      </div>

      {/* Links */}

      <div className="font-light flex-center gap-x-6">

        {/* Navlinks */}
        {
          navLinks.map((navLink) => (
            <a href={navLink.href} id={navLink.name}>{navLink.name}</a>
          ))
        }

        {!isLoggedIn && <Link to="/signup">Register</Link>}
        {!isLoggedIn && <Link to="/signin">Login</Link>}
        {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
      </div>
    </footer>
  );
};

export default Footer;
