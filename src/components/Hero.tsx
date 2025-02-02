import { ArrowRight, FileCheck, Upload } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 opacity-10 z-8">
        <div className="animate-pulse absolute top-20 left-20 ">
          <FileCheck size={64} />
        </div>
        <div className="animate-pulse absolute top-40 right-40">
          <Upload size={48} />
        </div>
      </div>
      <div className="max-w-6xl mx-auto text-center z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-50">
          Effortless Invoice Matching for Accurate Payments
        </h1>
        <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto">
          Automate your invoice reconciliation process with AI-powered matching
          technology. Save time, reduce errors, and process payments faster.
        </p>
        <Link to="/upload">
          <button className="z-50 px-8 py-4 cursor-pointer text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 transition-all duration-300 flex items-center gap-2 mx-auto">
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </section>
  );
}
