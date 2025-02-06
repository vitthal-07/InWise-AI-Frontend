import { Filter as FilterIcon, Plus, Search, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiltersSidebar } from "../components/FiltersSidebar";
import { MatchCard } from "../components/MatchCard";
import { MatchTable } from "../components/MatchTable";
import { FilterState, MatchData, MatchResult } from "../types";
import { useMatchContext } from "../context/MatchContext";
import { ExportCSV } from "../components/ExportXLSX";
import { ManualMatch } from "../components/ManualMatch";
import { DetailedMatchModal } from "../components/DetailedMatchModal";
import { toast } from "react-toastify";

export function MatchPage() {
  const { matchId = "" } = useParams();
  const [view, setView] = useState<"grid" | "table">("table");
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [manualMatchOpen, setManualMatchOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<MatchData | null>(null);
  const [sortField, setSortField] = useState("matchDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { start: "", end: "" },
    confidenceRange: { min: 0, max: 100 },
    status: [],
    searchTerm: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { matches } = useMatchContext();
  const [matchSet, setMatchSet] = useState<MatchData[]>([]);
  const API_URL = import.meta.env.VITE_API_URL as string;

  // Retrieve the cloudinary URL from the match result context
  const matchResult: MatchResult | undefined = matches.find(
    (obj: MatchResult) => obj._id === matchId
  );
  const cloudinaryUrl = matchResult?.result_file;

  // Debounced fetchMatchData function inside useEffect
  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        if (!cloudinaryUrl) {
          console.error("Match not found or missing Cloudinary URL");
          return;
        }
        setLoading(true);

        // Build query parameters from filters and search term
        const params = new URLSearchParams();
        params.append("page", currentPage.toString());
        if (filters.dateRange.start)
          params.append("dateStart", filters.dateRange.start);
        if (filters.dateRange.end)
          params.append("dateEnd", filters.dateRange.end);
        params.append("minConfidence", filters.confidenceRange.min.toString());
        params.append("maxConfidence", filters.confidenceRange.max.toString());
        if (filters.status.length > 0) {
          params.append("status", filters.status.join(","));
        }
        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }

        const url = `${API_URL}/process_xlsx?${params.toString()}`;

        const entriesResponse = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cloudinary_url: cloudinaryUrl }),
        });
        if (!entriesResponse.ok) throw new Error("Failed to fetch entries");

        const data = await entriesResponse.json();
        // Assume the response has structure: { data: MatchData[] }
        setMatchSet((data as { data: MatchData[] }).data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    // Debounce: Wait 500ms after the last change before calling fetchMatchData
    const debounceTimer = setTimeout(() => {
      if (matchId && cloudinaryUrl) {
        fetchMatchData();
      }
    }, 500);

    // Cleanup: Clear the timer if any dependency changes
    return () => clearTimeout(debounceTimer);
  }, [currentPage, matchId, cloudinaryUrl, filters, searchTerm]);

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

  // Filter matches client-side (if needed)
  const filteredMatches = matchSet.filter((match) => {
    const matchesSearch =
      searchTerm === "" ||
      match.invoice_1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.invoice_2.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesConfidence =
      Number(match.confidence_score) >= filters.confidenceRange.min &&
      Number(match.confidence_score) <= filters.confidenceRange.max;

    const matchesStatus =
      filters.status.length === 0 || filters.status.includes(match.status);

    return matchesSearch && matchesConfidence && matchesStatus;
  });

  const unmatchedInvoices = matchSet.filter(
    (match) => match.status === "unmatched"
  );

  const handleManualMatch = (invoice1: string, invoice2: string) => {
    fetch(`${API_URL}/manual_match`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        invoice_1: invoice1,
        invoice_2: invoice2,
        cloudinary_url: cloudinaryUrl,
        match_id: matchId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to perform manual match");
        }
        return response.json();
      })
      .then(() => {
        toast.success("Manual match successful");
      })
      .catch(() => {
        toast.error("Failed to perform manual match");
      });
    setManualMatchOpen(false);
  };

  const handleViewDetails = (match: MatchData) => {
    setSelectedMatch(match);
    setDetailsModalOpen(true);
  };

  return (
    <div className="space-y-6 pt-3 px-6">
      {/* Search and Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 w-full sm:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search invoices..."
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
          <ExportCSV cloudinaryUrl={cloudinaryUrl || ""} />
        </div>
      </div>

      {/* Match Results */}
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
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="animate-spin h-10 w-10 text-blue-500" />
            </div>
          ) : view === "grid" ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredMatches.map((match) => (
                <MatchCard
                  key={match.match_id}
                  fileId={matchId}
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

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button
          disabled={currentPage === 1 || loading}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-1 text-gray-700">Page {currentPage}</span>
        <button
          disabled={loading}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-lg"
        >
          Next
        </button>
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
        unmatchedInvoices={unmatchedInvoices}
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
