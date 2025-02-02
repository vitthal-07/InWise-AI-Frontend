import React from "react";

const testimonials = [
  {
    name: "John Doe",
    feedback: "This tool saved us hours of work every week!",
  },
  { name: "Sarah Smith", feedback: "The matching accuracy is top-notch." },
];

export const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-900 text-white text-center">
      <h2 className="text-3xl font-semibold mb-6">What Users Say</h2>
      <div className="space-y-6 max-w-4xl mx-auto">
        {testimonials.map((t, index) => (
          <blockquote key={index} className="bg-gray-800 p-6 rounded-lg">
            <p className="text-lg">“{t.feedback}”</p>
            <span className="block mt-2 text-blue-400">- {t.name}</span>
          </blockquote>
        ))}
      </div>
    </section>
  );
};
