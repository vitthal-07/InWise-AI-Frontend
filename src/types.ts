export interface Invoice {
  id: string;
  amount: number;
  date: string;
  vendor: string;
  status: "matched" | "unmatched" | "pending";
  confidence?: number;
}

export interface MatchResult {
  dataset1Invoice: Invoice;
  dataset2Invoice: Invoice;
  confidence: number;
  status: "matched" | "unmatched" | "pending";
}

export interface UserStats {
  totalMatched: number;
  pendingReview: number;
  accuracy: number;
  feedbackGiven: number;
}
