import { Filter as FilterIcon, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailedMatchModal } from "../components/DetailedMatchModal";
import { ExportCSV } from "../components/ExportCSV";
import { FiltersSidebar } from "../components/FiltersSidebar";
import { ManualMatch } from "../components/ManualMatch";
import { MatchCard } from "../components/MatchCard";
import { MatchTable } from "../components/MatchTable";
import { FilterState, Invoice, MatchResult } from "../types";

// Mock data for demonstration
const mockMatches: MatchResult[] = [
  {
    id: "1",
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
    confidence: 95,
    status: "success",
    matchDate: "2024-03-15T10:30:00Z",
    matchedBy: "auto",
  },
  {
    id: "2",
    dataset1Invoice: {
      id: "INV-002",
      amount: 2750.5,
      date: "2024-03-16",
      vendor: "Tech Solutions",
      status: "matched",
    },
    dataset2Invoice: {
      id: "INV-TS01",
      amount: 2750.5,
      date: "2024-03-16",
      vendor: "TechSolutions",
      status: "matched",
    },
    confidence: 85,
    status: "partial",
    matchDate: "2024-03-16T12:45:00Z",
    matchedBy: "auto",
  },
  {
    id: "3",
    dataset1Invoice: {
      id: "INV-003",
      amount: 500.0,
      date: "2024-03-17",
      vendor: "Global Services",
      status: "matched",
    },
    dataset2Invoice: {
      id: "INV-GS01",
      amount: 500.0,
      date: "2024-03-17",
      vendor: "Global Services",
      status: "matched",
    },
    confidence: 100,
    status: "success",
    matchDate: "2024-03-17T09:15:00Z",
    matchedBy: "auto",
  },
  
];

const mockUnmatchedInvoices: Invoice[] = [
  {
    id: "INV-002",
    amount: 2750.5,
    date: "2024-03-16",
    vendor: "Tech Solutions",
    status: "unmatched",
  },
];

export function MatchPage() {
  const { fileId } = useParams();
  const [view, setView] = useState<"grid" | "table">("table");
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [manualMatchOpen, setManualMatchOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<MatchResult | null>(null);
  const [sortField, setSortField] = useState("matchDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { start: "", end: "" },
    confidenceRange: { min: 0, max: 100 },
    status: [],
    searchTerm: "",
  });

  // In a real application, you would fetch matches for the specific fileId
  useEffect(() => {
    // Fetch matches for the specific fileId
    console.log(`Fetching matches for file: ${fileId}`);
  }, [fileId]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleDownload = (invoiceId: string) => {
    console.log(`Downloading invoice: ${invoiceId}`);
  };

  const handleManualMatch = (invoice1: Invoice, invoice2: Invoice) => {
    console.log("Manual match:", { invoice1, invoice2 });
    setManualMatchOpen(false);
  };

  const handleViewDetails = (match: MatchResult) => {
    setSelectedMatch(match);
    setDetailsModalOpen(true);
  };

  const filteredMatches = mockMatches.filter((match) => {
    const matchesSearch =
      searchTerm === "" ||
      match.dataset1Invoice.id
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      match.dataset2Invoice.id
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      match.dataset1Invoice?.vendor
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      match.dataset2Invoice?.vendor
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesDateRange =
      !filters.dateRange.start ||
      !filters.dateRange.end ||
      (new Date(match.matchDate) >= new Date(filters.dateRange.start) &&
        new Date(match.matchDate) <= new Date(filters.dateRange.end));

    const matchesConfidence =
      match.confidence >= filters.confidenceRange.min &&
      match.confidence <= filters.confidenceRange.max;

    const matchesStatus =
      filters.status.length === 0 || filters.status.includes(match.status);

    return (
      matchesSearch && matchesDateRange && matchesConfidence && matchesStatus
    );
  });

  return (
    <div className="space-y-6 pt-3 px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 w-full sm:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search matches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilterSidebarOpen(true)}
            className="inline-flex items-center cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            <FilterIcon className="w-4 h-4 mr-2" />
            Filters
          </button>
          <button
            onClick={() => setManualMatchOpen(true)}
            className="inline-flex items-center cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Manual Match
          </button>
          <ExportCSV matches={filteredMatches} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Match Results
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setView("table")}
                className={`p-2 rounded-lg cursor-pointer ${
                  view === "table"
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                    : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                Table
              </button>
              <button
                onClick={() => setView("grid")}
                className={`p-2 rounded-lg cursor-pointer ${
                  view === "grid"
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                    : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                Grid
              </button>
            </div>
          </div>

          {view === "grid" ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onDownload={handleDownload}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <MatchTable
              matches={filteredMatches}
              onSort={handleSort}
              sortField={sortField}
              sortDirection={sortDirection}
              onDownload={handleDownload}
              onViewDetails={handleViewDetails}
            />
          )}
        </div>
      </div>

      <FiltersSidebar
        isOpen={filterSidebarOpen}
        onClose={() => setFilterSidebarOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
      />

      <ManualMatch
        isOpen={manualMatchOpen}
        onClose={() => setManualMatchOpen(false)}
        unmatchedInvoices={mockUnmatchedInvoices}
        onMatch={handleManualMatch}
      />

      <DetailedMatchModal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        match={selectedMatch}
        onDownload={handleDownload}
      />
    </div>
  );
}
