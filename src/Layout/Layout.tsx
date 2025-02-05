import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { MatchProvider } from "../context/MatchContext";
import { ToastContainer } from "react-toastify";

export function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <MatchProvider>
      <div
        className={`min-h-screen ${
          isDarkMode ? "dark bg-gray-900 text-white" : "bg-gray-50"
        }`}
      >
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <ToastContainer />

        <div className="flex pt-16">
          <main className={`flex-1 transition-all duration-300`}>
            <Outlet />
          </main>
        </div>
      </div>
    </MatchProvider>
  );
}
