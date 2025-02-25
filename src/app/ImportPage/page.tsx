"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { StudentData } from "../StudentDirectory/StudentData";

type MappingType = {
  [key in keyof StudentData]?: string;
};

const initialMapping: MappingType = {
  student_id: "",
  student_name: "",
  department: "",
  email: "",
  phone_number: "",
  year_of_admission: "",
  dob: "",
  address: "",
};

const Import_Students = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [dragActive, setDragActive] = useState<boolean>(false);

  const [excelHeaders, setExcelHeaders] = useState<string[]>([]);
  const [excelData, setExcelData] = useState<any[]>([]);

  const [mapping, setMapping] = useState<MappingType>(initialMapping);

  const [mappedData, setMappedData] = useState<Partial<StudentData>[]>([]);

  const [successMessage, setSuccessMessage] = useState<string>("");

  const allowedExtensions = [".xls", ".xlsx", ".csv"];

  const handleFileValidation = (file: File): void => {
    if (!file) return;

    const fileExtension = file.name
      .slice(file.name.lastIndexOf("."))
      .toLowerCase();
    if (allowedExtensions.includes(fileExtension)) {
      setSelectedFile(file);
      setError("");
      parseExcelFile(file, fileExtension);
    } else {
      setSelectedFile(null);
      setExcelHeaders([]);
      setExcelData([]);
      setError(
        "Only Excel files (.xls, .xlsx) and CSV files (.csv) are allowed."
      );
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

        // Convert the sheet to JSON (array of arrays)
        const data = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        }) as any[];
        if (data.length > 0) {
          // First row is headers
          const headers = data[0] as string[];
          setExcelHeaders(headers);

          // Subsequent rows are data
          const rows = data.slice(1);
          setExcelData(rows);
        }
      } catch (err) {
        console.error("Error parsing file:", err);
        setError("Error reading file.");
      }
    };

    // Read as text if CSV, else as ArrayBuffer
    fileExtension === ".csv"
      ? reader.readAsText(file)
      : reader.readAsArrayBuffer(file);
  };

  // ------------------------------
  // Drag and Drop
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

  // Convert the raw Excel data into proper types for StudentData
  const convertToProperType = (value: any, field: keyof StudentData): any => {
    if (value === undefined || value === null) return null;

    // For numeric fields, convert if needed (e.g., phone_number)
    // In this example, let's assume phone_number remains string.
    // If you want to handle numeric logic, do so here.
    // if (field === "phone_number") {
    //   return String(value);
    // }

    // For date fields, you might keep them as strings or parse them.
    // For now, we'll just convert everything else to string by default.
    return String(value);
  };

  const handleMapData = () => {
    // Ensure at least one mapping is set
    const hasMappings = Object.values(mapping).some((val) => val !== "");
    if (!hasMappings) {
      setError("Please map at least one column before proceeding.");
      return;
    }

    if (excelData.length === 0) {
      setError("No data to map. Please upload a file with data.");
      return;
    }

    try {
      const mapped: Partial<StudentData>[] = [];

      excelData.forEach((row) => {
        const studentEntry: Partial<StudentData> = {};

        // For each field in our mapping
        Object.entries(mapping).forEach(([field, excelColumn]) => {
          if (excelColumn) {
            // Find the index of the mapped Excel column
            const columnIndex = excelHeaders.indexOf(excelColumn);
            if (columnIndex !== -1 && row[columnIndex] !== undefined) {
              // Convert the cell value appropriately
              studentEntry[field as keyof StudentData] = convertToProperType(
                row[columnIndex],
                field as keyof StudentData
              );
            }
          }
        });

        // Only push if there's at least one field
        if (Object.keys(studentEntry).length > 0) {
          mapped.push(studentEntry);
        }
      });

      setMappedData(mapped);
      setSuccessMessage(`Successfully mapped ${mapped.length} records`);
      console.log("Mapped data:", mapped);
    } catch (err) {
      console.error("Error mapping data:", err);
      setError("Error occurred while mapping data.");
    }
  };

  // ------------------------------
  // Import Logic
  // ------------------------------
  const handleImportData = async () => {
    // If not mapped yet, map first
    if (mappedData.length === 0) {
      handleMapData();
      return;
    }

    try {
      // Send mapped data to backend
      console.log("Sending data to backend:", mappedData);

      // Example API call (commented out):
      /*
      const response = await fetch('/api/students/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mappedData),
      });
      if (!response.ok) {
        throw new Error('Failed to import data');
      }
      const result = await response.json();
      setSuccessMessage(`Successfully imported ${result.count} students`);
      */

      // For demo, just show success message
      setSuccessMessage(
        `Ready to send ${mappedData.length} student records to backend`
      );
    } catch (err) {
      console.error("Error importing data:", err);
      setError("Error occurred while importing data.");
    }
  };

  return (
    <div className="flex justify-center items-center w-full mt-6 min-h-screen">
      <div className="p-6 w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">
          Student Management - Import Student Data
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Upload an Excel or CSV file containing student data and map the
          columns.
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
                      handleMappingChange(
                        field as keyof StudentData,
                        e.target.value
                      )
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
