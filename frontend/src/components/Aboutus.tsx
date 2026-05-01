const Aboutus = () => {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16 scroll-mt-10" id="about">
      <p className="font-bold text-4xl pb-6 text-center">About DevLog</p>
      <p className="text-lg text-gray-600 leading-relaxed mb-4">
        I'm Kiran Raut, a fullstack developer based in Mumbai. DevLog was born
        out of frustration — I was tired of using AI to write my code and
        decided to build something completely on my own. Every line. No
        shortcuts.
        {" "}<span className="italic">(Ssh except CSS, nobody writes CSS)</span>{" "}
      </p>
      <p className="text-lg text-gray-600 leading-relaxed">
        But DevLog is also something I genuinely needed. A simple system to
        write down what I want to achieve each day — and at the end of the day,
        honestly note whether I did it or not. No fancy features. No
        distractions. Just you, your goals, and your truth.
      </p>
    </section>
  );
};

export default Aboutus;
