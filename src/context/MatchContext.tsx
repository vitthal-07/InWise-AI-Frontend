import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MatchResult } from "../types";

interface MatchContextType {
  matches: MatchResult[];
  addMatch: (match: MatchResult) => void;
  fetchMatches: () => Promise<void>;
  postResultFileForFileId: (fileId: string) => Promise<void>;
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export const MatchProvider = ({ children }: { children: React.ReactNode }) => {
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    // try {
    //   const response = await fetch("http://localhost:5000/fetch_entries");
    //   if (!response.ok) throw new Error("Failed to fetch matches");
    //   const data = await response.json();

    //   // Map only necessary fields
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   const formattedData: MatchResult[] = data.map((item: any) => ({
    //     id: item.match_id,
    //     resultfile: item.resultfile,
    //     timestamp: item.timestamp,
    //   }));

    //   setMatches(formattedData);
    // } catch (error) {
    //   console.error("Error fetching matches:", error);
    // }
    setMatches([
      {
        id: "1",
        result_file: "resultfile1",
        time_stamp: "2021-09-01T12:00:00Z",
      },
      {
        id: "2",
        result_file: "resultfile2",
        time_stamp: "2021-09-02T12:00:00Z",
      },
      {
        id: "3",
        result_file: "resultfile3",
        time_stamp: "2021-09-03T12:00:00Z",
      },

    ])
  };

  const addMatch = (match: MatchResult) => {
    setMatches((prevMatches) => [match, ...prevMatches]);
    navigate(`/matches/${match.id}`);
  };

  /**
   * Finds the match entry for the given fileId and posts the `resultfile` URL in the request body.
   * The request is sent as JSON.
   */
  const postResultFileForFileId = async (fileId: string) => {
    const match = matches.find((m) => m.id === fileId);
    if (!match) {
      console.error(`No match found for fileId: ${fileId}`);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/fetch_entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cloudinary_url: match.result_file }),
      });

      if (!response.ok) {
        throw new Error("Failed to post result file");
      }

      const responseData = await response.json();
      console.log("Successfully posted result file:", responseData);
    } catch (error) {
      console.error("Error posting result file:", error);
    }
  };

  return (
    <MatchContext.Provider
      value={{ matches, addMatch, fetchMatches, postResultFileForFileId }}
    >
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
