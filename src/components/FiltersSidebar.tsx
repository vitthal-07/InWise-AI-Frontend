import { Calendar, Filter, Percent, Tag, X } from "lucide-react";
import { FilterState } from "../types";

interface FiltersSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function FiltersSidebar({
  isOpen,
  onClose,
  filters,
  onFilterChange,
}: FiltersSidebarProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="px-4 py-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Date Range Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white flex items-center mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) =>
                      handleFilterChange("dateRange", {
                        ...filters.dateRange,
                        start: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) =>
                      handleFilterChange("dateRange", {
                        ...filters.dateRange,
                        end: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Confidence Range Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white flex items-center mb-4">
                <Percent className="w-4 h-4 mr-2" />
                Confidence Range
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Minimum ({filters.confidenceRange.min}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.confidenceRange.min}
                    onChange={(e) =>
                      handleFilterChange("confidenceRange", {
                        ...filters.confidenceRange,
                        min: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Maximum ({filters.confidenceRange.max}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.confidenceRange.max}
                    onChange={(e) =>
                      handleFilterChange("confidenceRange", {
                        ...filters.confidenceRange,
                        max: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white flex items-center mb-4">
                <Tag className="w-4 h-4 mr-2" />
                Status
              </h3>
              <div className="space-y-2">
                {["success", "partial", "failed"].map((status) => (
                  <label key={status} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.status.includes(status)}
                      onChange={(e) => {
                        const newStatus = e.target.checked
                          ? [...filters.status, status]
                          : filters.status.filter((s) => s !== status);
                        handleFilterChange("status", newStatus);
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() =>
              onFilterChange({
                dateRange: { start: "", end: "" },
                confidenceRange: { min: 0, max: 100 },
                status: [],
                searchTerm: "",
              })
            }
            className="w-full px-4 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md dark:bg-blue-900/50 dark:text-blue-400 dark:hover:bg-blue-900/70"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}
