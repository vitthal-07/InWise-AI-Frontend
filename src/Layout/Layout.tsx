import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "dark bg-gray-900 text-white" : "bg-gray-50"
      }`}
    >
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <div className="flex pt-16">
        <main className={`flex-1 transition-all duration-300`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
