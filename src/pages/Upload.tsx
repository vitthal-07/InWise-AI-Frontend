import { AlertCircle, Loader2 } from "lucide-react";
import { FileUpload } from "../components/FileUpload";
import { useState } from "react";
import { useMatchContext } from "../context/MatchContext";
import { MatchResult } from "../types";
import { toast } from "react-toastify";

export function Upload() {
  const [poFile, setPoFile] = useState<File | null>(null);
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { addMatch } = useMatchContext();

  const handleFileUpload = async () => {
    if (poFile && invoiceFile) {
      setLoading(true);
      const formData = new FormData();
      formData.append("po_file", poFile);
      formData.append("invoice_file", invoiceFile);
      toast.info("Processing files. Please wait...");

      try {
        const response = await fetch("http://localhost:5000/process", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Failed to upload files");

        const result = await response.json();

        // Normalize the returned data to an array.
        let formattedMatches: MatchResult[] = [];
        if (Array.isArray(result.data)) {
          formattedMatches = result.data.map(
            (item: {
              _id: { $oid: string };
              file_url: string;
              timestamp: { $date: string };
            }) => ({
              _id: item._id.$oid,
              result_file: item.file_url,
              time_stamp: item.timestamp.$date,
            })
          );
        } else {
          // If result.data is a single object, wrap it in an array.
          const item = result.data;
          formattedMatches = [
            {
              _id: item._id.$oid,
              result_file: item.file_url,
              time_stamp: item.timestamp.$date,
            },
          ];
        }

        if (formattedMatches.length > 0) {
          // Use the first match from the array.
          const formattedData = formattedMatches[0];
          addMatch(formattedData);
          console.log("formattedData", formattedData);
          toast.success("Files uploaded successfully!");
        } else {
          throw new Error("No match data returned from the server.");
        }
      } catch (error) {
        console.error("Error uploading files:", error);
        toast.error("Failed to upload files. Please try again.");
      } finally {
        setLoading(false);
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
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer"
            onClick={handleFileUpload}
          >
            {loading ? (
              <Loader2 className="animate-spin h-6 w-6 text-blue-500" />
            ) : (
              "Upload Files"
            )}
          </button>
        </div>
      )}

      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="flex items-center space-x-2 text-yellow-600 dark:text-yellow-500 mb-4">
          <AlertCircle className="w-5 h-5" />
          <h3 className="text-lg font-medium">Important Notes</h3>
        </div>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
          <li>Ensure your datasets are in the correct format (XLSX or CSV).</li>
          <li>Each invoice record should contain: ID information.</li>
          <li>Maximum file size: 50MB per dataset.</li>
          <li>Processing time may vary based on dataset size.</li>
        </ul>
      </div>
    </div>
  );
}
