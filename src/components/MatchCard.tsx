import { Download, ExternalLink, FileText } from "lucide-react";
import { MatchData, MatchResult } from "../types";
import { useMatchContext } from "../context/MatchContext";

interface MatchCardProps {
  match: MatchData;
  onDownload: (invoiceId: string) => void;
  onViewDetails: (match: MatchData) => void;
  fileId: string;
}

export function MatchCard({
  match,
  onDownload,
  onViewDetails,
  fileId,
}: MatchCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "exact":
        return "bg-green-500/10 text-green-500";
      case "partial":
        return "bg-yellow-500/10 text-yellow-500";
      case "failed":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };
  const { matches }: { matches: MatchResult[] } = useMatchContext();

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-500";
    if (confidence >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  function obj(value: MatchResult): boolean {
    return value.id === fileId;
  }
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-500" />
          <h3 className="font-medium text-gray-900 dark:text-white">
            Match #{match.match_id}
          </h3>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            match.status
          )}`}
        >
          {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Invoice 1:
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {match.invoice_1}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Invoice 2:
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {match.invoice_2}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Confidence:
          </span>
          <span
            className={`text-sm font-medium ${getConfidenceColor(
              match.confidence_score
            )}`}
          >
            {match.confidence_score}%
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Matched On:
          </span>
          <span className="text-sm text-gray-900 dark:text-white">
            {(() => {
              const matchData = matches.find(obj);
              return matchData
                ? new Date(matchData.time_stamp).toLocaleDateString()
                : "N/A";
            })()}
          </span>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => onDownload(match.invoice_1)}
          className="flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <Download className="w-4 h-4 mr-1" />
          Download
        </button>
        <button
          onClick={() => onViewDetails(match)}
          className="flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          View Details
        </button>
      </div>
    </div>
  );
}
