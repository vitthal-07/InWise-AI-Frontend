import { FileText, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMatchContext } from "../context/MatchContext";

export function MatchFilesPage() {
  const { matches, fetchMatches } = useMatchContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMatches();
  }, []);

  const handleMatchClick = (matchId: string) => {
    navigate(`/match/${matchId}`);
  };

  if (!matches) return <p>Loading...</p>;
  return (
    <div className="space-y-6 pt-3 px-6">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 w-full sm:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search matches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Matches List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {matches.map((match) => (
          <div
            key={match._id}
            onClick={() => handleMatchClick(match._id)}
            className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-blue-500" />
                <h3 className="font-medium">
                    {match?.result_file?.split("/").pop()}
                </h3>
              </div>
              <p className="text-sm text-gray-400">
                {new Date(match.time_stamp).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
