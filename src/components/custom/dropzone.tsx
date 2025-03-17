"use client";

import React, { useRef } from "react";

const Dropzone = ({
  selectedFile,
  setSelectedFile,
  processFile,
}: {
  selectedFile: {
    title: string;
    headers: string[];
    data: any[];
  };
  setSelectedFile: (e: {
    title: string;
    headers: string[];
    data: any[];
  }) => void;
  processFile: (e: File | null) => void;
}) => {
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
      className="border-2 border-dashed border-[#0066FF99] rounded-xl p-6 text-center mb-6 bg-[#0066FF11] transition-all duration-300 hover:shadow-md"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {selectedFile?.title ? (
        <div className="flex flex-col items-center">
          <p className="text-[#1E40AF] font-bold mt-2">
            {selectedFile.title} uploaded!
          </p>
          <button
            onClick={() =>
              setSelectedFile({
                title: "",
                data: [],
                headers: [],
              })
            }
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
      {/* {error && (
        <p className="text-red-500 mt-2 whitespace-pre-line">{error}</p>
      )}
      {successMessage && !error && (
        <p className="text-green-500 mt-2">{successMessage}</p>
      )} */}
    </div>
  );
};

export default Dropzone;
