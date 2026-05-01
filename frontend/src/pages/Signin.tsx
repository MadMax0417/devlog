import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <main className="min-h-screen px-6 py-12">
      <section className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
            Welcome back
          </p>
          <h1 className="mt-4 text-4xl font-bold text-gray-900 md:text-6xl">
            Sign in and keep your day on track.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-gray-600 md:text-lg">
            Log in to review your goals, stay honest with your progress, and
            keep the system simple.
          </p>
        </div>

        <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm md:p-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Sign in</h2>
            <p className="mt-2 text-sm text-gray-500">
              Use your email and password to continue.
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                />
                Remember me
              </label>

              <a href="#" className="font-medium text-gray-900 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-900"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-semibold text-black hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Signin;
