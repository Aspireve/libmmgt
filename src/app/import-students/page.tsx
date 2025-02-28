"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useCreate } from "@refinedev/core";

export interface StudentData {
  department: string;
  email: string;
  address: string;
  full_name: string;
  phone_no: string;
}

type MappingType = {
  [key in keyof StudentData]?: string;
};

const initialMapping: MappingType = {
  full_name: "",
  department: "",
  email: "",
  phone_no: "",
  address: "",
};

const Import_Students = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [excelHeaders, setExcelHeaders] = useState<string[]>([]);
  const [excelData, setExcelData] = useState<any[]>([]);
  const [mapping, setMapping] = useState<MappingType>(initialMapping);
  const [mappedData, setMappedData] = useState<Partial<StudentData>[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const allowedExtensions = [".xls", ".xlsx", ".csv"];
  const { mutate } = useCreate();

  // File Validation & Parsing
  const handleFileValidation = (file: File) => {
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (allowedExtensions.includes(ext)) {
      setSelectedFile(file);
      setError("");
      parseExcelFile(file, ext);
    } else {
      setSelectedFile(null);
      setExcelHeaders([]);
      setExcelData([]);
      setError("Only Excel files (.xls, .xlsx) and CSV files (.csv) are allowed.");
    }
  };

  const parseExcelFile = (file: File, ext: string) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (!result) return;
      try {
        const workbook: XLSX.WorkBook =
          ext === ".csv"
            ? XLSX.read(result as string, { type: "string" })
            : XLSX.read(result as ArrayBuffer, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[];
        if (data.length > 0) {
          setExcelHeaders(data[0] as string[]);
          setExcelData(data.slice(1));
        }
      } catch (err) {
        console.error("Error parsing file:", err);
        setError("Error reading file.");
      }
    };
    ext === ".csv" ? reader.readAsText(file) : reader.readAsArrayBuffer(file);
  };

  // Drag & Drop Handlers (combined)
  const handleDragEvent = (e: React.DragEvent<HTMLDivElement>, active: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(active);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvent(e, false);
    if (e.dataTransfer.files?.[0]) {
      handleFileValidation(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files?.[0] && handleFileValidation(e.target.files[0]);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setExcelHeaders([]);
    setExcelData([]);
    setMapping(initialMapping);
    setMappedData([]);
    setError("");
    setSuccessMessage("");
  };

  // Mapping Logic
  const handleMappingChange = (field: keyof StudentData, value: string) => {
    setMapping((prev) => ({ ...prev, [field]: value }));
  };

  const handleMapData = () => {
    setError("");
    setSuccessMessage("");

    if (!excelData.length) {
      setError("No data to map. Please upload a file with data.");
      return;
    }

    try {
      const mapped = excelData
        .map((row) => {
          const studentEntry: Partial<StudentData> = {};
          Object.entries(mapping).forEach(([field, col]) => {
            const colIndex = excelHeaders.indexOf(col);
            if (col && colIndex !== -1 && row[colIndex] !== undefined) {
              studentEntry[field as keyof StudentData] = String(row[colIndex]).trim();
            }
          });
          return studentEntry;
        })
        .filter((entry) => Object.keys(entry).length > 0);

      setMappedData(mapped);
      setSuccessMessage(`Successfully mapped ${mapped.length} records`);

      mapped.forEach((record) => {
        mutate(
          {
            resource: "create",
            values: { ...record, institute_id: "828f0d33-258f-4a92-a235-9c1b30d8882b" },
          },
          {
            onSuccess: (data) => console.log("Book created successfully:", data),
            onError: (error) => console.error("Error creating book:", error),
          }
        );
      });
    } catch (err) {
      console.error("Error mapping data:", err);
      setError("Error occurred while mapping data.");
    }
  };

  const handleImportData = () => {
    if (!mappedData.length) handleMapData();
  };

  return (
    <div className="flex justify-center items-center w-full mt-6 min-h-screen">
      <div className="p-6 w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">
          Student Management - Import Student Data
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Upload an Excel or CSV file containing student data and map the columns.
        </p>

        {/* File Upload Section */}
        <div
          className={`border-2 rounded-lg p-6 text-center mb-6 transition-colors ${
            dragActive ? "border-blue-500 border-dashed bg-blue-50" : "border-dashed border-gray-300"
          }`}
          onDragOver={(e) => handleDragEvent(e, true)}
          onDragLeave={(e) => handleDragEvent(e, false)}
          onDrop={handleDrop}
        >
          {selectedFile ? (
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-2xl">📤</span>
              <p className="text-green-600 font-medium mt-2">
                {selectedFile.name} uploaded successfully!
              </p>
              <p className="text-blue-500 text-sm cursor-pointer mt-1" onClick={handleRemoveFile}>
                Upload a different file
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-24">
              <p className="text-gray-500 text-sm mb-2">
                Drag and drop your Excel or CSV file here
              </p>
              <p className="text-sm text-gray-500 mb-2">OR</p>
              <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                Select File
                <input type="file" accept=".xls, .xlsx, .csv" onChange={handleChange} className="hidden" />
              </label>
            </div>
          )}
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
        </div>

        {/* Column Mapping Section */}
        {selectedFile && excelHeaders.length > 0 && (
          <>
            <h3 className="text-lg font-medium mb-4">
              Map Excel/CSV Columns to Student Fields
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(mapping).map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-sm text-gray-700 mb-1">
                    {field.replace(/_/g, " ")}
                  </label>
                  <select
                    className="border border-gray-300 rounded p-2"
                    value={mapping[field as keyof StudentData] || ""}
                    onChange={(e) => handleMappingChange(field as keyof StudentData, e.target.value)}
                  >
                    <option value="">Select Excel Column</option>
                    {excelHeaders.map((header, index) => (
                      <option key={index} value={header}>
                        {header}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-6">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleMapData}
              >
                Map Data
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleImportData}
                disabled={excelData.length === 0}
              >
                Import Data
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Import_Students;
