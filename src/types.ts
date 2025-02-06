export interface MatchResult {
  _id: string;
  result_file: string;
  time_stamp: string;
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
  status: ("exact" | "partial" | "unmatched" | "manual")[];
  searchTerm: string;
}

export interface MatchData {
  match_id: number;
  invoice_1: string;
  invoice_2: string;
  confidence_score: number;
  status: "exact" | "partial" | "unmatched" | "manual";
}
