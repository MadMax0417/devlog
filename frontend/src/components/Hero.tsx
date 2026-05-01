import { NavLink } from "react-router-dom";

const Hero = () => {
  return (

    <section className="h-[60vh] w-full baloo text-center px-6">

      <div className="col-center text-5xl md:text-6xl h-full gap-y-4">
        <div className="font-bold text-center gap-y-4 ">
          <h1>Log your goals</h1>
          <h1>win them</h1>
        </div>
        <p className="font-light text-lg md:text-xl text-gray-800">
          A simple tool to log your day and win the day.
        </p>

        <NavLink
          className="border py-2 text-lg px-4 rounded-3xl text-white 
                    bg-black hover:bg-gray-900 transition-all duration-300 hover:shadow-xl"
          to="/signup"
        >
          Register Now
        </NavLink>
      </div>
    </section>
  );
};

export default Hero;
