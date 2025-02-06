import { FileUp, Upload as UploadIcon } from "lucide-react";
import React, { useState } from "react";

interface FileUploadProps {
  label: string;
  onFileUpload: (file: File | null) => void;
  file: File | null;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  onFileUpload,
  file,
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    onFileUpload(droppedFile || null);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    onFileUpload(selectedFile);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800 flex-1">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {label}
      </h2>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          dragActive
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 dark:border-gray-600"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <UploadIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Drag & drop your file here, or
        </p>
        <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
          <FileUp className="w-4 h-4 mr-2" />
          Browse File
          <input
            type="file"
            className="hidden"
            accept=".xlsx,.csv"
            onChange={handleFileInput}
          />
        </label>
      </div>

      {file && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {file.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => onFileUpload(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
