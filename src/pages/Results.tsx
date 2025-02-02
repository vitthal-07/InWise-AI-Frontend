import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle,
  Download,
  Filter,
  Search,
  XCircle,
} from "lucide-react";
import type { MatchResult } from "../types";

const mockResults: MatchResult[] = [
  {
    dataset1Invoice: {
      id: "INV-001",
      amount: 1500.0,
      date: "2024-03-15",
      vendor: "Acme Corp",
      status: "matched",
    },
    dataset2Invoice: {
      id: "INV-A101",
      amount: 1500.0,
      date: "2024-03-15",
      vendor: "Acme Corporation",
      status: "matched",
    },
    confidence: 0.95,
    status: "matched",
  },
  {
    dataset1Invoice: {
      id: "INV-002",
      amount: 2750.5,
      date: "2024-03-16",
      vendor: "Tech Solutions",
      status: "pending",
    },
    dataset2Invoice: {
      id: "INV-B202",
      amount: 2750.5,
      date: "2024-03-16",
      vendor: "Tech Solutions Inc",
      status: "pending",
    },
    confidence: 0.82,
    status: "pending",
  },
  {
    dataset1Invoice: {
      id: "INV-003",
      amount: 899.99,
      date: "2024-03-17",
      vendor: "Global Services",
      status: "unmatched",
    },
    dataset2Invoice: {
      id: "INV-C303",
      amount: 899.99,
      date: "2024-03-18",
      vendor: "Global Services LLC",
      status: "unmatched",
    },
    confidence: 0.45,
    status: "unmatched",
  },
];
export function Results() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [statusFilter, setStatusFilter] = useState<
    "all" | "matched" | "unmatched" | "pending"
  >(
    (searchParams.get("status") as
      | "all"
      | "matched"
      | "unmatched"
      | "pending") || "all"
  );

  useEffect(() => {
    const params: { [key: string]: string } = {};
    if (searchTerm) params.search = searchTerm;
    if (statusFilter !== "all") params.status = statusFilter;
    setSearchParams(params);
  }, [searchTerm, statusFilter, setSearchParams]);

  const filteredResults = mockResults.filter((result) => {
    const matchesSearch =
      result.dataset1Invoice.id
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      result.dataset2Invoice.id
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      result.dataset1Invoice.vendor
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || result.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "matched":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "unmatched":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "pending":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-green-500";
    if (confidence >= 0.7) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Matching Results
          </h2>
          <div className="flex items-center space-x-2">
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search invoices..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value as "all" | "matched" | "unmatched" | "pending"
                )
              }
            >
              <option value="all">All Status</option>
              <option value="matched">Matched</option>
              <option value="unmatched">Unmatched</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Dataset 1 Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Dataset 2 Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Confidence
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredResults.map((result, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusIcon(result.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white font-medium">
                      {result.dataset1Invoice.id}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {result.dataset1Invoice.vendor}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      ${result.dataset1Invoice.amount.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white font-medium">
                      {result.dataset2Invoice.id}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {result.dataset2Invoice.vendor}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      ${result.dataset2Invoice.amount.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-medium ${getConfidenceColor(
                        result.confidence
                      )}`}
                    >
                      {(result.confidence * 100).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
