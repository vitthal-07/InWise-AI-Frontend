import React, { useState, useRef } from "react";
import { Upload, FileUp, X, FileText } from "lucide-react";

interface FileUploadAreaProps {
  label: string;
  file: File | null;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
}

const FileUploadArea = ({
  label,
  file,
  onFileSelect,
  onFileRemove,
}: FileUploadAreaProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      onFileSelect(droppedFile);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-white">{label}</h3>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
      />
      {!file ? (
        <div
          className={`
            border-2 border-dashed rounded-xl p-6 cursor-pointer
            ${isDragging ? "border-blue-500 bg-navy-700" : "border-gray-600"}
            transition-colors duration-200
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <div className="flex flex-col items-center text-center">
            <Upload className="text-gray-400 mb-2" size={24} />
            <p className="text-gray-400 text-sm">
              Drag and drop or click to select
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-navy-700 p-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <FileText size={16} className="text-gray-400" />
            <span className="text-sm text-white">{file.name}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFileRemove();
            }}
            className="p-1 hover:bg-navy-600 rounded-full transition-colors"
          >
            <X size={16} className="text-gray-400 hover:text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export const QuickUpload = () => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);

  return (
    <div className="bg-navy-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Quick Upload</h2>
      <div className="space-y-4">
        <FileUploadArea
          label="Upload Invoice"
          file={file1}
          onFileSelect={(file) => setFile1(file)}
          onFileRemove={() => setFile1(null)}
        />
        <FileUploadArea
          label="Upload Receipt"
          file={file2}
          onFileSelect={(file) => setFile2(file)}
          onFileRemove={() => setFile2(null)}
        />
      </div>

      <button
        className={`
          w-full mt-6 py-2 px-4 rounded-lg
          flex items-center justify-center space-x-2
          ${
            file1 && file2
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-600 cursor-not-allowed"
          }
          transition-colors duration-200
        `}
        disabled={!file1 || !file2}
      >
        <FileUp size={20} />
        <span>Match Files</span>
      </button>
    </div>
  );
};
