import { useState } from "react";

const tabs = [
  {
    id: "simple",
    label: "Simple",
    title: "Track only what matters",
    description: "Log your goals for the day without extra clutter.",
  },
  {
    id: "honest",
    label: "Honest",
    title: "Mark the truth",
    description: "End the day with a clear yes or no on what got done.",
  },
  {
    id: "fast",
    label: "Fast",
    title: "Write it in seconds",
    description: "A quick flow that keeps your focus on execution.",
  },
];

const Features = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const currentTab = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <section id="features" className="mx-auto max-w-3xl px-6 py-16 scroll-mt-10">
      <div className="mb-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
          Features
        </p>
        <h2 className="mt-2 text-3xl font-bold text-gray-900">
          Minimal by design
        </h2>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-3 shadow-sm">
        <div className="grid grid-cols-3 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-2xl px-3 py-2 text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-black text-white"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-gray-50 px-5 py-6">
          <p className="text-lg font-semibold text-gray-900">
            {currentTab.title}
          </p>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            {currentTab.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
