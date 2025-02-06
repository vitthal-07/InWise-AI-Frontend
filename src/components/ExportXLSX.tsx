import { FileDown } from "lucide-react";

interface ExportCSVProps {
  cloudinaryUrl: string;
}

export function ExportCSV({ cloudinaryUrl }: ExportCSVProps) {
  return (
    <a
      href={cloudinaryUrl}
      className="inline-flex items-center cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
    >
      <FileDown className="w-4 h-4 mr-2" />
      Export as XLSX
    </a>
  );
}
