"use client";

import React, { useRef } from "react";

interface DropdownProps<T> {
  selectedFile: T | null;
  clearSelectedFile: () => void;
  processFile: (file: File | null) => void;
  getFileTitle?: (file: T) => string;
}

interface BaseFileData {
  title: string; // Ensures every file object has a title
}

const Dropzone = <T extends BaseFileData>({
  selectedFile,
  clearSelectedFile,
  processFile,
   getFileTitle = (file) => file.title || "File"
}: DropdownProps<T>) => {
  const dropRef = useRef<HTMLDivElement>(null);
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      dropRef.current?.classList.add("border-blue-500");
      setTimeout(
        () => dropRef.current?.classList.remove("border-blue-500"),
        500
      );
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dropRef.current?.classList.add("border-blue-500");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dropRef.current?.classList.remove("border-blue-500");
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };
  return (
    <div
      ref={dropRef}
      className=""
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {selectedFile?.title ? (
        <div className="flex flex-col items-center">
          <p className="text-[#1E40AF] font-bold mt-2">
            {getFileTitle(selectedFile)} uploaded!
          </p>
          <button
            onClick={clearSelectedFile}
            className="text-gray-500 text-sm mt-1 hover:text-black transition-all duration-100"
          >
            Change file
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-24">
          <p className="text-gray-500 text-sm mb-2">
            Drag and drop file here or,{" "}
            <span className="text-[#1E40AF]">browse local files.</span>
          </p>
          <label className="bg-[#0066FF33] font-bold px-4 py-2 rounded-xl cursor-pointer text-[#1E40AF] mt-2">
            Browse Files
            <input
              type="file"
              accept=".xls,.xlsx,.csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
