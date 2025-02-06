import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MatchResult } from "../types";

interface MatchContextType {
  matches: MatchResult[];
  addMatch: (match: MatchResult) => void;
  fetchMatches: () => Promise<void>;
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export const MatchProvider = ({ children }: { children: React.ReactNode }) => {
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL as string;

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await fetch(`${API_URL}/matches`);
      if (!response.ok) throw new Error("Failed to fetch matches");
      const data = await response.json();

      // Map the fetched data to your MatchResult format
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const formattedData: MatchResult[] = data.map((item: any) => ({
        _id: item._id.$oid,
        result_file: item.file_url,
        time_stamp: item.timestamp.$date,
      }));
      setMatches(formattedData);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  const addMatch = (match: MatchResult) => {
    setMatches((prevMatches) => [match, ...prevMatches]);
    navigate(`/match/${match._id}`);
  };

  return (
    <MatchContext.Provider value={{ matches, addMatch, fetchMatches }}>
      {children}
    </MatchContext.Provider>
  );
};

export const useMatchContext = () => {
  const context = useContext(MatchContext);
  if (!context)
    throw new Error("useMatchContext must be used within a MatchProvider");
  return context;
};
