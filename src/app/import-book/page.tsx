"use client";

import { useCreate } from "@refinedev/core";
import React, { useState } from "react";
import * as XLSX from "xlsx";

interface BookData {
  book_title: string;
  book_author: string;
  name_of_publisher: string;
  place_of_publication: string;
  year_of_publication: string;
  language: string;
  edition: string;
  isbn: string;
  no_of_pages: number;
  no_of_preliminary_pages: number;
  subject: string;
  department: string;
  call_number: string;
  author_mark: string;
  source_of_acquisition?: string;
  date_of_acquisition?: string;
  inventory_number: number;
  accession_number: number;
  barcode?: string;
  item_type?: string;
  bill_no: number;
}

type MappingType = {
  [key in keyof BookData]?: string;
};

const initialMapping: MappingType = {
  book_title: "",
  book_author: "",
  name_of_publisher: "",
  place_of_publication: "",
  year_of_publication: "",
  language: "",
  edition: "",
  isbn: "",
  no_of_pages: "",
  no_of_preliminary_pages: "",
  subject: "",
  department: "",
  call_number: "",
  author_mark: "",
  source_of_acquisition: "",
  date_of_acquisition: "",
  inventory_number: "",
  accession_number: "",
  barcode: "",
  item_type: "",
  bill_no: "",
};

const Import_Books = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [excelHeaders, setExcelHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<MappingType>(initialMapping);
  const [excelData, setExcelData] = useState<any[]>([]);
  const [mappedData, setMappedData] = useState<Partial<BookData>[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const allowedExtensions = [".xls", ".xlsx", ".csv"];

  const{mutate} = useCreate()

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
        let workbook;
        if (fileExtension === ".csv") {
          workbook = XLSX.read(result as string, { type: "string" });
        } else {
          workbook = XLSX.read(result as ArrayBuffer, { type: "array" });
        }
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[];
        
        if (data.length > 0) {
          const headers = data[0] as string[];
          setExcelHeaders(headers);
         
          const rows = data.slice(1);
          setExcelData(rows);
        }
      } catch (err) {
        console.error("Error parsing file:", err);
        setError("Error reading file.");
      }
    };
    fileExtension === ".csv" ? reader.readAsText(file) : reader.readAsArrayBuffer(file);
  };

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

  const handleMappingChange = (field: keyof BookData, value: string) => {
    setMapping((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const convertToProperType = (value: any, field: keyof BookData): any => {
    if (value === undefined || value === null) return null;
    if (
      field === "no_of_pages" || 
      field === "no_of_preliminary_pages" || 
      field === "inventory_number" || 
      field === "accession_number" ||
      field === "bill_no"
    ) {
      const num = Number(value);
      return isNaN(num) ? 0 : num;
    }
    
    if (field === "year_of_publication" || field === "date_of_acquisition") {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split("T")[0];
      }
      return "";
    }
    return String(value);
  };

  const handleImportData = () => {
    // Check if mapping has been configured
    const hasMappings = Object.values(mapping).some(value => value !== "");
    
    if (!hasMappings) {
      setError("Please map at least one column before proceeding.");
      return;
    }
    
    if (excelData.length === 0) {
      setError("No data to map. Please upload a file with data.");
      return;
    }
    
    try {
      // Create an array to store mapped data
      const mapped: Partial<BookData>[] = [];
      
      // Process each row in the Excel data
      excelData.forEach(row => {
        const bookEntry: Partial<BookData> = {};
        
        // For each field in our mapping
        Object.entries(mapping).forEach(([field, excelColumn]) => {
          if (excelColumn) {
            // Find the index of the mapped Excel column
            const columnIndex = excelHeaders.indexOf(excelColumn);
            if (columnIndex !== -1 && row[columnIndex] !== undefined) {
              // Add the data with proper type conversion
              bookEntry[field as keyof BookData] = convertToProperType(
                row[columnIndex], 
                field as keyof BookData
              );
            }
          }
        });

        if (Object.keys(bookEntry).length > 0) {
          mapped.push(bookEntry);
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

  return (
    <div className="flex justify-center items-center w-full mt-6 min-h-screen">
      <div className="p-6 w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">
          Library Management - Import Book Data
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Upload an Excel or CSV file containing book data and map the columns.
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
          {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
        </div>

        {/* Column Mapping Section */}
        {selectedFile && excelHeaders.length > 0 && (
          <>
            <h3 className="text-lg font-medium mb-4">
              Map Excel/CSV Columns to Book Fields
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(mapping).map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-sm text-gray-700 mb-1">
                    {field.replace(/_/g, " ")}
                  </label>
                  <select
                    className="border border-gray-300 rounded p-2"
                    value={mapping[field as keyof BookData] || ""}
                    onChange={(e) =>
                      handleMappingChange(field as keyof BookData, e.target.value)
                    }
                  >
                    <option value="">Select</option>
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
                onClick={handleImportData}
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

export default Import_Books;
