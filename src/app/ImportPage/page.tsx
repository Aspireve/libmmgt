"use client";

import React, { useState } from "react";

const Page: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [dragActive, setDragActive] = useState<boolean>(false);

  // Validate file type
  const handleFileValidation = (file: File): void => {
    if (!file) return;
    const allowedExtensions = [".xls", ".xlsx"];
    const fileExtension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();

    if (allowedExtensions.includes(fileExtension)) {
      setSelectedFile(file);
      setError("");
    } else {
      setSelectedFile(null);
      setError("Only Excel files (.xls or .xlsx) are allowed.");
    }
  };

  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileValidation(e.dataTransfer.files[0]);
    }
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  // Handle drag leave
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  // Handle file selection via input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      handleFileValidation(e.target.files[0]);
    }
  };

  // Reset the file selection
  const handleRemoveFile = (): void => {
    setSelectedFile(null);
    setError("");
  };

  return (
    <div className="flex justify-center items-center w-[70%] ml-[192px] mt-6 min-h-screen">
      <div className="border border-gray-300 rounded-lg p-6 w-full bg-white shadow-md">
        <h2 className="text-xl font-semibold">Import Excel / CSV Data</h2>
        <p className="text-gray-600 text-sm mb-4">
          Upload your file and map the columns to import data
        </p>

        {/* File Upload Section */}
        <div
          className={`border-2 rounded-lg p-6 text-center mb-6 transition-colors ${
            dragActive
              ? "border-blue-500 border-dashed bg-blue-50"
              : "border-dashed border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {selectedFile ? (
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-2xl">📤</span>
              <p className="text-green-600 font-medium mt-2">
                {selectedFile.name} uploaded successfully!
              </p>
              <p
                className="text-blue-500 text-sm cursor-pointer mt-1"
                onClick={handleRemoveFile}
              >
                Upload a different file
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-24">
              <p className="text-gray-500 text-sm mb-2">
                Drag and drop your Excel file here
              </p>
              <p className="text-sm text-gray-500 mb-2">OR</p>
              <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                Select File
                <input
                  type="file"
                  accept=".xls, .xlsx"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>
          )}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {/* Column Mapping */}
        <h3 className="text-lg font-medium mb-2">Map Columns</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            "id",
            "firm_name",
            "meter_number",
            "meter_type",
            "vehicle_number",
            "vehicle_type",
            "seal_number",
            "status",
            "certi_number",
            "iscertified",
            "updated_at",
            "pulse",
            "mechanic_id",
            "created_at",
          ].map((field, index) => (
            <div key={index} className="flex flex-col">
              <label className="text-sm text-gray-700 mb-1 capitalize">
                {field.replace("_", " ")}
              </label>
              <select className="border border-gray-300 rounded p-2">
                <option>Select field</option>
                <option>{field.replace("_", " ")} (Mapped)</option>
              </select>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Map Data
          </button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
            Import Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
