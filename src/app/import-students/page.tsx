"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useCreate } from "@refinedev/core";

// Final StudentData interface with only the specified fields.
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
  // File and mapping state management.
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [excelHeaders, setExcelHeaders] = useState<string[]>([]);
  const [excelData, setExcelData] = useState<any[]>([]);
  const [mapping, setMapping] = useState<MappingType>(initialMapping);
  const [mappedData, setMappedData] = useState<Partial<StudentData>[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const allowedExtensions = [".xls", ".xlsx", ".csv"];
  const { mutate } = useCreate();

  // ------------------------------
  // File Handling & Parsing
  // ------------------------------
  const handleFileValidation = (file: File): void => {
    if (!file) return;
    const fileExtension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (allowedExtensions.includes(fileExtension)) {
      setSelectedFile(file);
      setError("");
      parseExcelFile(file, fileExtension);
    } else {
      setSelectedFile(null);
      setExcelHeaders([]);
      setExcelData([]);
      setError("Only Excel files (.xls, .xlsx) and CSV files (.csv) are allowed.");
    }
  };

  const parseExcelFile = (file: File, fileExtension: string) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (!result) return;
      try {
        let workbook: XLSX.WorkBook;
        if (fileExtension === ".csv") {
          workbook = XLSX.read(result as string, { type: "string" });
        } else {
          workbook = XLSX.read(result as ArrayBuffer, { type: "array" });
        }
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[];
        if (data.length > 0) {
          // First row is assumed to be the header.
          setExcelHeaders(data[0] as string[]);
          // Remaining rows are the data.
          setExcelData(data.slice(1));
        }
      } catch (err) {
        console.error("Error parsing file:", err);
        setError("Error reading file.");
      }
    };
    fileExtension === ".csv" ? reader.readAsText(file) : reader.readAsArrayBuffer(file);
  };

  // ------------------------------
  // Drag and Drop Handlers
  // ------------------------------
  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileValidation(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      handleFileValidation(e.target.files[0]);
    }
  };

  const handleRemoveFile = (): void => {
    setSelectedFile(null);
    setExcelHeaders([]);
    setExcelData([]);
    setMapping(initialMapping);
    setMappedData([]);
    setError("");
    setSuccessMessage("");
  };

  // ------------------------------
  // Mapping Logic
  // ------------------------------
  const handleMappingChange = (field: keyof StudentData, value: string) => {
    setMapping((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMapData = () => {
    setError("");
    setSuccessMessage("");

    // Validate that every field is mapped.
    // for (const field in mapping) {
    //   if (!mapping[field as keyof StudentData]) {
    //     setError("Please map all fields before proceeding.");
    //     return;
    //   }
    // }

    if (excelData.length === 0) {
      setError("No data to map. Please upload a file with data.");
      return;
    }

    try {
      const mapped: Partial<StudentData>[] = [];
      // Process each row from the Excel data.
      for (const row of excelData) {
        const studentEntry: Partial<StudentData> = {};
        for (const [field, excelColumn] of Object.entries(mapping)) {
          if (excelColumn) {
            const columnIndex = excelHeaders.indexOf(excelColumn);
            if (columnIndex !== -1 && row[columnIndex] !== undefined) {
              const value = String(row[columnIndex]).trim();
              studentEntry[field as keyof StudentData] = value;
            }
          }
        }
        if (Object.keys(studentEntry).length > 0) {
          mapped.push(studentEntry);
        }
      }
      setMappedData(mapped);
      setSuccessMessage(`Successfully mapped ${mapped.length} records`);
      mapped.forEach((record) => {
        const recordWithInstitute = {
          ...record,
          institute_id: "828f0d33-258f-4a92-a235-9c1b30d8882b"
        };
        mutate(
          {
            resource: "create",
            values: recordWithInstitute,
          },
          {
            onSuccess: (data) => {
              console.log("Book created successfully:", data);
            },
            onError: (error) => {
              console.error("Error creating book:", error);
            },
          }
        );
      });
    } catch (err) {
      console.error("Error mapping data:", err);
      setError("Error occurred while mapping data.");
    }
  };

  // ------------------------------
  // Import Logic
  // ------------------------------
  const handleImportData = () => {
    if (mappedData.length === 0) {
      handleMapData();
      return;
    }


  };

  // ------------------------------
  // Render Component
  // ------------------------------
  return (
    <div className="flex justify-center items-center w-full h-4/5">
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
                Drag and drop your Excel or CSV file here
              </p>
              <p className="text-sm text-gray-500 mb-2">OR</p>
              <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                Select File
                <input
                  type="file"
                  accept=".xls, .xlsx, .csv"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>
          )}
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {successMessage && (
            <p className="text-green-500 mt-2">{successMessage}</p>
          )}
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
                    onChange={(e) =>
                      handleMappingChange(field as keyof StudentData, e.target.value)
                    }
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

            {/* Action Buttons */}
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
