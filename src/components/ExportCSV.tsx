import { FileDown } from "lucide-react";
import { MatchResult } from "../types";

interface ExportCSVProps {
  matches: MatchResult[];
}

export function ExportCSV({ matches }: ExportCSVProps) {
  const handleExport = () => {
    const headers = [
      "Match ID",
      "Invoice 1 ID",
      "Invoice 1 Vendor",
      "Invoice 1 Amount",
      "Invoice 2 ID",
      "Invoice 2 Vendor",
      "Invoice 2 Amount",
      "Confidence",
      "Status",
      "Match Date",
    ];

    const csvData = matches.map((match) => [
      match.id,
      match.dataset1Invoice.id,
      match.dataset1Invoice.vendor,
      match.dataset1Invoice.amount,
      match.dataset2Invoice.id,
      match.dataset2Invoice.vendor,
      match.dataset2Invoice.amount,
      match.confidence,
      match.status,
      match.matchDate,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...csvData.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `invoice-matches-${new Date().toISOString()}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
    >
      <FileDown className="w-4 h-4 mr-2" />
      Export CSV
    </button>
  );
}
