import { AlertTriangle, CheckCircle, Download, X, XCircle } from "lucide-react";
import { MatchResult } from "../types";

interface DetailedMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: MatchResult | null;
  onDownload: (invoiceId: string) => void;
}

export function DetailedMatchModal({
  isOpen,
  onClose,
  match,
  onDownload,
}: DetailedMatchModalProps) {
  if (!match) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "partial":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-500";
    if (confidence >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-4 pt-5 pb-4 sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="w-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Match Details #{match.id}
                  </h3>
                  <div className="flex items-center">
                    {getStatusIcon(match.status)}
                    <span
                      className={`ml-2 text-sm font-medium ${getConfidenceColor(
                        match.confidence
                      )}`}
                    >
                      {match.confidence}% Confidence
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Invoice 1
                    </h4>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            ID:
                          </span>
                          <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                            {match.dataset1Invoice.id}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Vendor:
                          </span>
                          <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                            {match.dataset1Invoice.vendor}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Amount:
                          </span>
                          <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                            ${match.dataset1Invoice.amount}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Date:
                          </span>
                          <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                            {match.dataset1Invoice.date}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => onDownload(match.dataset1Invoice.id)}
                        className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download Invoice
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Invoice 2
                    </h4>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            ID:
                          </span>
                          <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                            {match.dataset2Invoice.id}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Vendor:
                          </span>
                          <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                            {match.dataset2Invoice.vendor}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Amount:
                          </span>
                          <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                            ${match.dataset2Invoice.amount}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Date:
                          </span>
                          <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                            {match.dataset2Invoice.date}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => onDownload(match.dataset2Invoice.id)}
                        className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download Invoice
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Match Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Match Date:
                      </span>
                      <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(match.matchDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Match Type:
                      </span>
                      <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                        {match.matchedBy === "auto" ? "Automatic" : "Manual"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
