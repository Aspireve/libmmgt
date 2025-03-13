"use client";

import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { useCreate } from "@refinedev/core";
import { parse, format } from "date-fns";
import { Loader2 } from "lucide-react";
import { FileProcessor } from "@/utilities/file_processor";
import { StudentDataBuilder } from "@/utilities/student_builder";

export interface StudentData {
  student_name: string;
  department: string;
  email: string;
  phone_no: string;
  address: string;
  roll_no: number; // This is a number
  year_of_admission: string;
  password: string;
  confirm_password: string;
  date_of_birth: string;
  gender: string;
  institute_name: string;
  institute_id: string;
}

// Adjust MappingType to match StudentData types
type MappingType = { [K in keyof StudentData]?: string };

const initialMapping: MappingType = {
  student_name: "",
  department: "",
  email: "",
  phone_no: "",
  address: "",
  roll_no: "", // Changed from 0 to "" (string) since mapping deals with column names
  year_of_admission: "",
  password: "",
  confirm_password: "",
  date_of_birth: "",
  gender: "",
  institute_id: "",
  institute_name: "",
};

const fieldLabels: Record<keyof StudentData, string> = {
  student_name: "Student Name",
  department: "Department",
  email: "Email",
  phone_no: "Phone Number",
  address: "Address",
  roll_no: "Roll Number", // Updated label from 0 to a string
  year_of_admission: "Year of Admission",
  password: "Password",
  confirm_password: "Confirm Password",
  date_of_birth: "Date of Birth",
  gender: "Gender",
  institute_id: "Institute ID",
  institute_name: "Institute Name",
};

const formatDate = (dateString: string) => {
  try {
    const parsedDate = parse(dateString, "MM/dd/yyyy", new Date());
    console.log(parsedDate);
    return format(parsedDate, "yyyy-MM-dd");
  } catch (error) {
    return "Invalid Date";
  }
};

const ImportStudents = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [excelHeaders, setExcelHeaders] = useState<string[]>([]);
  const [excelData, setExcelData] = useState<any[]>([]);
  const [mapping, setMapping] = useState<MappingType>(initialMapping);
  const [mappedData, setMappedData] = useState<Partial<StudentData>[]>([]);
  const { mutate, isLoading } = useCreate();
  const dropRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setError("");
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

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      if (!data) {
        setError("Failed to read file.");
        return;
      }
      try {
        // const workbook = XLSX.read(data, { type: "array" });
        // const sheet = workbook.Sheets[workbook.SheetNames[0]];
        // const sheetData = XLSX.utils.sheet_to_json(sheet, {
        //   header: 1,
        // }) as any[];
        // if (sheetData.length > 0) {
        const processor = FileProcessor.getProcessor(file.type);
        const { headers, data } = processor.process(
          event.target.result as ArrayBuffer
        );
        setExcelHeaders(headers);
        setExcelData(data);
        setSelectedFile(file);
        setError("");
        setMapping(initialMapping);
        // } else {
        //   setError("No data found in the file.");
        // }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleMappingChange = (field: keyof StudentData, value: string) => {
    setMapping((prev) => ({ ...prev, [field]: value }));
  };

  const handleMapData = () => {
    const mapped = excelData
      .map(
        (row) =>
          new StudentDataBuilder(row, mapping, excelHeaders)
            .setField("date_of_birth", (value) => {
              const parsedDate = new Date(value);
              return !isNaN(parsedDate.getTime())
                ? parsedDate.toISOString().split("T")[0]
                : "";
            })
            .setField("roll_no", (value) => {
              const num = Number(value);
              return isNaN(num) ? 0 : num;
            })
            .setField("student_name")
            .setField("department")
            .setField("email")
            .setField("phone_no")
            .setField("address")
            .setField("year_of_admission")
            .setField("password")
            .setField("confirm_password")
            .setField("gender")
            .setField("institute_id")
            .setField("institute_name")
            .build()
        //   {

        //   const studentEntry: Partial<StudentData> = {};

        //   Object.entries(mapping).forEach(([field, column]) => {
        //     const fieldKey = field as keyof StudentData;
        //     const colIndex = excelHeaders.indexOf(column);
        //     if (column && colIndex !== -1 && row[colIndex] !== undefined) {
        //       let value: any = row[colIndex];

        //       // ✅ Convert date_of_birth to YYYY-MM-DD
        //       if (fieldKey === "date_of_birth") {
        //         const parsedDate = new Date(value);
        //         if (!isNaN(parsedDate.getTime())) {
        //           value = parsedDate.toISOString().split("T")[0]; // Convert to YYYY-MM-DD
        //         } else {
        //           console.warn(`Invalid Date: ${value}`);
        //           value = ""; // Set empty or handle error case
        //         }
        //       }

        //       // ✅ Convert roll_no to number
        //       if (fieldKey === "roll_no") {
        //         value = Number(value);
        //         if (isNaN(value)) value = 0; // Fallback for invalid numbers
        //       }

        //       // ✅ Assign the value only if it's not undefined
        //       (studentEntry as any)[fieldKey] = value;
        //     }
        //   });

        //   return studentEntry;
        // }
      )
      .filter((entry) => Object.keys(entry).length > 0);

    setMappedData(mapped);
    console.log(mapped);
    setSuccessMessage(`Successfully mapped ${mapped.length} records.`);
    if (mapped.length === 0) {
      setError("No data to import.");
      return;
    }
    mutate(
      { resource: "student/bulk-create", values: mapped },
      {
        onSuccess: () => setSuccessMessage("Data imported successfully!"),
        onError: () => setError("Import failed."),
      }
    );
  };

  // const handleImportData = () => {
  //   if (mappedData.length === 0) {
  //     setError("No data to import.");
  //     return;
  //   }
  //   mutate(
  //     { resource: "student/bulk-create", values: mappedData },
  //     {
  //       onSuccess: () => setSuccessMessage("Data imported successfully!"),
  //       onError: () => setError("Import failed."),
  //     }
  //   );
  // };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Import Student Data</h2>
      <p className="text-gray-600 text-sm mb-4">
        Upload an Excel or CSV file and map columns.
      </p>
      <div
        ref={dropRef}
        className="border-2 border-dashed border-[#0066FF99] rounded-xl p-6 text-center mb-6 bg-[#0066FF11] transition-all duration-300 hover:shadow-md"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {selectedFile ? (
          <div className="flex flex-col items-center">
            <p className="text-[#1E40AF] font-bold mt-2">
              {selectedFile.name} uploaded!
            </p>
            <button
              onClick={() => setSelectedFile(null)}
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
        {error && (
          <p className="text-red-500 mt-2 whitespace-pre-line">{error}</p>
        )}
        {successMessage && !error && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}
      </div>
      {selectedFile && excelHeaders.length > 0 && (
        <>
          <h3 className="text-lg font-medium mb-4">Map Columns</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(fieldLabels).map((field) => {
              const fieldKey = field as keyof StudentData;
              return (
                <div key={field} className="flex flex-col">
                  <label className="text-sm text-gray-700 mb-1">
                    {fieldLabels[fieldKey]}
                  </label>
                  <select
                  
                    className="border border-gray-300 rounded p-2"
                    value={
                      excelHeaders.includes(fieldKey)
                        ? fieldKey
                        : mapping[fieldKey] || ""
                    }
                    onChange={(e) =>
                      handleMappingChange(fieldKey, e.target.value)
                    }
                  >
                    {/* excelHeaders.includes(fieldKey) ? fieldKey : "" */}
                    <option value="">Select Column</option>
                    {excelHeaders.map((header, index) => (
                      <option key={index} value={header}>
                        {header}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-6">
            {/* <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleMapData}
            >
              Map Data
            </button> */}
            <button
              className={`bg-[#1E40AF] hover:bg-[#1E40AF] transition-all duration-300 cursor-pointer w-full text-white px-4 py-2 rounded flex items-center justify-center ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleMapData}
              // onClick={() => {
              // handleMapData();
              // handleImportData();
              // }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Importing...
                </>
              ) : (
                "Import Data"
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImportStudents;
