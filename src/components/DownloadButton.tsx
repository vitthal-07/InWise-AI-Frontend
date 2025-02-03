import { Download } from "lucide-react";

interface DownloadButtonProps {
  onDownload: () => void;
  label?: string;
  className?: string;
}

export function DownloadButton({
  onDownload,
  label = "Download",
  className = "",
}: DownloadButtonProps) {
  return (
    <button
      onClick={onDownload}
      className={`inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${className}`}
    >
      <Download className="w-4 h-4 mr-2" />
      {label}
    </button>
  );
}
