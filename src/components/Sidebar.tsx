import { FileUser, House, LayoutDashboard, Upload } from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  sidebarOpen: boolean;
  darkMode: boolean;
}
const Sidebar = ({ sidebarOpen, darkMode }: SidebarProps) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 pt-16 transition-transform duration-300 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } ${
        darkMode ? "bg-gray-800" : "bg-white"
      } border-r border-gray-200 dark:border-gray-700`}
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2">
          <Link to="/" key="Home" className="cursor-pointer">
            <button
              className={`flex items-center w-full p-2 rounded-lg ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-gray-900 hover:bg-gray-100"
              }`}
            >
              <House className="w-5 h-5 mr-1" />
              Home
            </button>
          </Link>
          <Link to="dashboard" key="Dashboard" className="cursor-pointer">
            <button
              className={`flex items-center w-full p-2 rounded-lg ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-gray-900 hover:bg-gray-100"
              }`}
            >
              <LayoutDashboard className="w-5 h-5 mr-1" />
              Dashboard
            </button>
          </Link>
          <Link to="/upload" key="Upload" className="cursor-pointer">
            <button
              className={`flex items-center w-full p-2 rounded-lg ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Upload className="w-5 h-5 mr-1" />
              Upload
            </button>
          </Link>
          <Link to="/results" key="Results" className="cursor-pointer">
            <button
              className={`flex items-center w-full p-2 rounded-lg ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-gray-900 hover:bg-gray-100"
              }`}
            >
              <FileUser className="w-5 h-5 mr-1" />
              Results
            </button>
          </Link>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
