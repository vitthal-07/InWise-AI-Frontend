import {
  AlertTriangle,
  CheckCircle,
  FileText,
  Search,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MatchFile } from "../types";

// Mock data for demonstration
const mockMatchFiles: MatchFile[] = [
  {
    id: "1",
    name: "March 2024 Invoices",
    uploadDate: "2024-03-15T10:30:00Z",
    totalInvoices: 150,
    matchedCount: 130,
    unmatchedCount: 15,
    pendingCount: 5,
    averageConfidence: 92.5,
  },
  {
    id: "2",
    name: "Q1 2024 Reconciliation",
    uploadDate: "2024-03-10T14:45:00Z",
    totalInvoices: 280,
    matchedCount: 245,
    unmatchedCount: 25,
    pendingCount: 10,
    averageConfidence: 88.3,
  },
];

export function MatchFilesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFiles = mockMatchFiles.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileClick = (fileId: string) => {
    navigate(`/matches/${fileId}`);
  };

  const getStatusIcon = (matched: number, total: number) => {
    const ratio = matched / total;
    if (ratio >= 0.9) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (ratio >= 0.7)
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  return (
    <div className="space-y-6 pt-3 px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 w-full sm:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Match Files
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                onClick={() => handleFileClick(file.id)}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-blue-500" />
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {file.name}
                    </h3>
                  </div>
                  {getStatusIcon(file.matchedCount, file.totalInvoices)}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Upload Date:
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {new Date(file.uploadDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Total Invoices:
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {file.totalInvoices}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-sm font-medium text-green-600 dark:text-green-400">
                        {file.matchedCount}
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400">
                        Matched
                      </div>
                    </div>
                    <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                        {file.pendingCount}
                      </div>
                      <div className="text-xs text-yellow-600 dark:text-yellow-400">
                        Pending
                      </div>
                    </div>
                    <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="text-sm font-medium text-red-600 dark:text-red-400">
                        {file.unmatchedCount}
                      </div>
                      <div className="text-xs text-red-600 dark:text-red-400">
                        Unmatched
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Average Confidence
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {file.averageConfidence}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${file.averageConfidence}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
