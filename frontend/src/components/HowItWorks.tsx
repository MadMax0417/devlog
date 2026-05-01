const steps = [
  {
    number: "01",
    title: "Add your goal",
    description: "Write down what you want to finish today in a few words.",
  },
  {
    number: "02",
    title: "Do the work",
    description: "Focus on the task without extra tabs, noise, or clutter.",
  },
  {
    number: "03",
    title: "Mark it honestly",
    description: "Close the loop by recording what actually got done.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
          How it works
        </p>
        <h2 className="mt-2 text-3xl font-bold text-gray-900">
          Three steps, nothing extra
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step) => (
          <article
            key={step.number}
            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-semibold tracking-[0.2em] text-gray-400">
              {step.number}
            </p>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
