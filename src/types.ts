export interface Invoice {
  id: string;
  amount?: number;
  date: string;
  vendor?: string;
  status: "matched" | "unmatched" | "pending";
}

export interface MatchResult {
  id: string;
  dataset1Invoice: Invoice;
  dataset2Invoice: Invoice;
  confidence: number;
  status: "success" | "partial" | "failed";
  matchDate: string;
  matchedBy: "auto" | "manual";
}

export interface FilterState {
  dateRange: {
    start: string;
    end: string;
  };
  confidenceRange: {
    min: number;
    max: number;
  };
  status: string[];
  searchTerm: string;
}
