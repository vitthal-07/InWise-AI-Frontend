import { Filter as FilterIcon, Plus, Search } from "lucide-react";
import { useState } from "react";
import { DetailedMatchModal } from "../components/DetailedMatchModal";
import { ExportCSV } from "../components/ExportCSV";
import { FiltersSidebar } from "../components/FiltersSidebar";
import { ManualMatch } from "../components/ManualMatch";
import { MatchCard } from "../components/MatchCard";
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
      id: "INV-TS202",
      amount: 2750.5,
      date: "2024-03-16",
      vendor: "TechSolutions",
      status: "matched",
    },
    confidence: 85,
    status: "success",
    matchDate: "2024-03-16T09:45:00Z",
    matchedBy: "auto",
  },
  {
    id: "3",
    dataset1Invoice: {
      id: "INV-003",
      amount: 500.0,
      date: "2024-03-17",
      vendor: "Food Corp",
      status: "matched",
    },
    dataset2Invoice: {
      id: "INV-FD101",
      amount: 500.0,
      date: "2024-03-17",
      vendor: "Food Corporation",
      status: "matched",
    },
    confidence: 75,
    status: "partial",
    matchDate: "2024-03-17T11:15:00Z",
    matchedBy: "auto",
  },
  {
    id: "4",
    dataset1Invoice: {
      id: "INV-004",
      amount: 750.0,
      date: "2024-03-18",
      vendor: "Tech Solutions",
      status: "matched",
    },
    dataset2Invoice: {
      id: "INV-TS203",
      amount: 750.0,
      date: "2024-03-18",
      vendor: "TechSolutions",
      status: "matched",
    },
    confidence: 60,
    status: "partial",
    matchDate: "2024-03-18T14:30:00Z",
    matchedBy: "auto",
  },
  {
    id: "5",
    dataset1Invoice: {
      id: "INV-005",
      amount: 1000.0,
      date: "2024-03-19",
      vendor: "Food Corp",
      status: "matched",
    },
    dataset2Invoice: {
      id: "INV-FD102",
      amount: 1000.0,
      date: "2024-03-19",
      vendor: "Food Corporation",
      status: "matched",
    },
    confidence: 50,
    status: "failed",
    matchDate: "2024-03-19T16:45:00Z",
    matchedBy: "auto",
  },
];

const mockUnmatchedInvoices: Invoice[] = [
  {
    id: "INV-006",
    amount: 1200.0,
    date: "2024-03-20",
    vendor: "Acme Corp",
    status: "unmatched",
  },
  {
    id: "INV-007",
    amount: 2000.0,
    date: "2024-03-21",
    vendor: "Tech Solutions",
    status: "unmatched",
  },
  {
    id: "INV-008",
    amount: 350.0,
    date: "2024-03-22",
    vendor: "Food Corp",
    status: "unmatched",
  },
  {
    id: "INV-009",
    amount: 800.0,
    date: "2024-03-23",
    vendor: "Tech Solutions",
    status: "unmatched",
  },
  {
    id: "INV-010",
    amount: 1500.0,
    date: "2024-03-24",
    vendor: "Food Corp",
    status: "unmatched",
  },
  {
    id: "INV-011",
    amount: 1800.0,
    date: "2024-03-25",
    vendor: "Tech Solutions",
    status: "unmatched",
  },
  {
    id: "INV-012",
    amount: 250.0,
    date: "2024-03-26",
    vendor: "Food Corp",
    status: "unmatched",
  },
  {
    id: "INV-013",
    amount: 900.0,
    date: "2024-03-27",
    vendor: "Tech Solutions",
    status: "unmatched",
  },
  {
    id: "INV-014",
    amount: 400.0,
    date: "2024-03-28",
    vendor: "Food Corp",
    status: "unmatched",
  },
  {
    id: "INV-015",
    amount: 700.0,
    date: "2024-03-29",
    vendor: "Tech Solutions",
    status: "unmatched",
  },
  {
    id: "INV-016",
    amount: 950.0,
    date: "2024-03-30",
    vendor: "Food Corp",
    status: "unmatched",
  },
];

export function MatchPage() {
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [manualMatchOpen, setManualMatchOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<MatchResult | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { start: "", end: "" },
    confidenceRange: { min: 0, max: 100 },
    status: [],
    searchTerm: "",
  });

  const handleDownload = (invoiceId: string) => {
    // Implement download logic
    console.log(`Downloading invoice: ${invoiceId}`);
  };

  const handleManualMatch = (invoice1: Invoice, invoice2: Invoice) => {
    // Implement manual match logic
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
      (match.dataset1Invoice.vendor ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      match.dataset2Invoice.vendor
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
    <div className="space-y-6 pt-2 px-3">
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
          </div>

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
