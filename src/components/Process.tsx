import { CheckCircle, FileCheck, Upload } from "lucide-react";

const steps = [
  {
    icon: <Upload className="w-8 h-8 text-blue-400" />,
    title: "Upload Documents",
    description: "Upload your invoices and matching documents in any format",
  },
  {
    icon: <FileCheck className="w-8 h-8 text-blue-400" />,
    title: "Automatic Matching",
    description:
      "Our AI engine automatically matches invoices with corresponding documents",
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-blue-400" />,
    title: "Review & Approve",
    description: "Quickly review matches and approve for payment processing",
  },
];

export function Process() {
  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-50">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="p-6 rounded-xl bg-gray-800 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-blue-100">
                  {step.title}
                </h3>
                <p className="text-blue-200">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 w-full h-0.5 bg-blue-500/20 transform translate-x-1/2">
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
