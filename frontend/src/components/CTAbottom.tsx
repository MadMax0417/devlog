import { NavLink } from "react-router-dom";

const CTAbottom = () => {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl rounded-[2rem] bg-black px-6 py-12 text-center text-white shadow-lg md:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-400">
          Ready to start?
        </p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">
          Log your day before it disappears.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-300 md:text-base">
          Keep it simple, keep it honest, and finish the day with a clear
          record of what happened.
        </p>

        <NavLink
          to="/signup"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
        >
          Get started
        </NavLink>
      </div>
    </section>
  );
};

export default CTAbottom;
