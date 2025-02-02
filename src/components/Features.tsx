import { Brain, Clock, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-8 h-8 text-blue-400" />,
    title: "Fast Processing",
    description:
      "Match thousands of invoices in minutes with our high-speed processing engine",
  },
  {
    icon: <Brain className="w-8 h-8 text-blue-400" />,
    title: "AI Matching",
    description:
      "Advanced AI algorithms ensure accurate matching even with complex invoice formats",
  },
  {
    icon: <Shield className="w-8 h-8 text-blue-400" />,
    title: "Secure & Reliable",
    description:
      "Bank-grade security with 99.9% uptime guarantee for your peace of mind",
  },
  {
    icon: <Clock className="w-8 h-8 text-blue-400" />,
    title: "Time Savings",
    description:
      "Reduce manual processing time by up to 90% with automated matching",
  },
];

export function Features() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-50">
          Why Choose Our Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl backdrop-blur-lg bg-white/5 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-blue-100">
                {feature.title}
              </h3>
              <p className="text-blue-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
