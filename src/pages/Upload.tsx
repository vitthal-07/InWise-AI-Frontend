import { AlertCircle } from "lucide-react";
import { FileUpload } from "../components/FileUpload";
import { useState } from "react";
import { useMatchContext } from "../context/MatchContext";
import { MatchResult } from "../types";

export function Upload() {
  const [poFile, setPoFile] = useState<File | null>(null);
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
  const { addMatch } = useMatchContext();

  const handleFileUpload = async () => {
    if (poFile && invoiceFile) {
      const formData = new FormData();
      formData.append("poFile", poFile);
      formData.append("invoiceFile", invoiceFile);

      try {
        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Failed to upload files");

        const result: MatchResult = await response.json();
        addMatch(result);
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
  };

  return (
    <div className="space-y-6 pt-4 px-6">
      <div className="flex flex-col md:flex-row gap-2">
        <FileUpload
          label="Upload Purchase Order Dataset"
          onFileUpload={setPoFile}
          file={poFile}
        />
        <FileUpload
          label="Upload Supplier Invoice Dataset"
          onFileUpload={setInvoiceFile}
          file={invoiceFile}
        />
      </div>

      {poFile && invoiceFile && (
        <div className="flex justify-center">
          <button
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer"
            onClick={handleFileUpload}
          >
            Match Invoices
          </button>
        </div>
      )}

      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="flex items-center space-x-2 text-yellow-600 dark:text-yellow-500 mb-4">
          <AlertCircle className="w-5 h-5" />
          <h3 className="text-lg font-medium">Important Notes</h3>
        </div>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
          <li>Ensure your datasets are in the correct format (JSON or CSV).</li>
          <li>
            Each invoice record should contain: ID, amount, date, and vendor
            information.
          </li>
          <li>Maximum file size: 50MB per dataset.</li>
          <li>Processing time may vary based on dataset size.</li>
        </ul>
      </div>
    </div>
  );
}
