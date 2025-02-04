import { ChevronDown, ChevronUp, Download, ExternalLink } from "lucide-react";
import { MatchResult } from "../types";

interface MatchTableProps {
  matches: MatchResult[];
  onSort: (field: string) => void;
  sortField: string;
  sortDirection: "asc" | "desc";
  onDownload: (invoiceId: string) => void;
  onViewDetails: (match: MatchResult) => void;
}

export function MatchTable({
  matches,
  onSort,
  sortField,
  sortDirection,
  onDownload,
  onViewDetails,
}: MatchTableProps) {
  const SortIcon = sortDirection === "asc" ? ChevronUp : ChevronDown;

  const renderSortIcon = (field: string) => {
    if (sortField === field) {
      return <SortIcon className="w-4 h-4 ml-1" />;
    }
    return null;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-500/10 text-green-500";
      case "partial":
        return "bg-yellow-500/10 text-yellow-500";
      case "failed":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-500";
    if (confidence >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort("id")}
            >
              <div className="flex items-center">
                Match ID
                {renderSortIcon("id")}
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Invoice 1
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Invoice 2
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort("confidence")}
            >
              <div className="flex items-center">
                Confidence
                {renderSortIcon("confidence")}
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort("status")}
            >
              <div className="flex items-center">
                Status
                {renderSortIcon("status")}
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort("matchDate")}
            >
              <div className="flex items-center">
                Match Date
                {renderSortIcon("matchDate")}
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {matches.map((match) => (
            <tr
              key={match.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                #{match.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {match.dataset1Invoice.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {match.dataset2Invoice.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  className={`font-medium ${getConfidenceColor(
                    match.confidence
                  )}`}
                >
                  {match.confidence}%
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    match.status
                  )}`}
                >
                  {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {new Date(match.matchDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-3">
                  <button
                    onClick={() => onDownload(match.dataset1Invoice.id)}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onViewDetails(match)}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
