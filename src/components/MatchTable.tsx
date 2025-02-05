import { ChevronDown, ChevronUp, Download, ExternalLink } from "lucide-react";
import { MatchData } from "../types";
import { useMatchContext } from "../context/MatchContext";

interface MatchTableProps {
  matches: MatchData[];
  onSort: (field: string) => void;
  sortField: string;
  sortDirection: "asc" | "desc";
  onDownload: (invoiceId: string) => void;
  onViewDetails: (match: MatchData) => void;
  fileId?: string; // Optional: used to find a timestamp if available.
}

export function MatchTable({
  matches,
  onSort,
  sortField,
  sortDirection,
  onDownload,
  onViewDetails,
  fileId,
}: MatchTableProps) {
  const { matches: contextMatches } = useMatchContext();
  const SortIcon = sortDirection === "asc" ? ChevronUp : ChevronDown;

  // Renders a sort icon if the current column is sorted.
  const renderSortIcon = (field: string) => {
    if (sortField === field) {
      return <SortIcon className="w-4 h-4 ml-1" />;
    }
    return null;
  };

  // Returns a background/text color based on status.
  const getStatusColor = (status: string) => {
    switch (status) {
      case "exact":
        return "bg-green-500/10 text-green-500";
      case "partial":
        return "bg-yellow-500/10 text-yellow-500";
      case "unmatched":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  // Returns a text color based on the confidence score.
  const getConfidenceColor = (status: string) => {
    if (status === "exact") return "text-green-500";
    if (status === "partial") return "text-yellow-500";
    return "text-gray-500";
  };

  // If available, retrieve a timestamp from the context similar to how MatchCard does.
  const getMatchDate = () => {
    // If a fileId is provided and context has a timestamp property, display it.
    if (fileId) {
      const found = contextMatches.find((m) => m.id === fileId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (found && (found as any).time_stamp) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new Date((found as any).time_stamp).toLocaleDateString();
      }
    }
    return "N/A";
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort("match_id")}
            >
              <div className="flex items-center">
                Match ID
                {renderSortIcon("match_id")}
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
              onClick={() => onSort("confidence_score")}
            >
              <div className="flex items-center">
                Confidence
                {renderSortIcon("confidence_score")}
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Match Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {matches.map((match) => (
            <tr
              key={match.match_id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                #{match.match_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {match.invoice_1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {match.invoice_2}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  className={`font-medium ${getConfidenceColor(match.status)}`}
                >
                  {match.confidence_score.toFixed(2)}%
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
                {getMatchDate()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-3">
                  <button
                    onClick={() => onDownload(match.invoice_1)}
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
