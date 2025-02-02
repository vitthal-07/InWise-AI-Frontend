import { Features } from "../components/Features";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Process } from "../components/Process";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-navy-900 text-white">
      <Hero />
      <Features />
      <Process />
      <Footer />
    </div>
  );
}

export default HomePage;
