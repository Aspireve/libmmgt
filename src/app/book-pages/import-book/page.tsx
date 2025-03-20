"use client";

import { useCreate } from "@refinedev/core";
import React, { Suspense, useState } from "react";
import * as XLSX from "xlsx";
import { BookData } from '../types/data'
import { initialMapping, MappingType } from './mapdata'
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import isbn3 from 'isbn3';

const allowedExtensions = [".xls", ".xlsx", ".csv"];

const Import_Books = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<MappingType>(initialMapping);
  const [data, setData] = useState<any[]>([]);
  const { mutate } = useCreate();

  const validateFile = (file: File) => {
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      toast.error("Invalid file type. Upload .xls, .xlsx, or .csv.");
      return false;
    }
    return true;
  };

  const parseFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (!result) return;
      try {
        const workbook = XLSX.read(result, { type: file.type.includes("csv") ? "binary" : "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        setHeaders(rows[0] as string[]);
        setData(rows.slice(1));
      } catch {
        toast.error("Error parsing file.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setFile(file);
      parseFile(file);
    }
  };

  const handleMappingChange = (field: keyof BookData, value: string) => {
    setMapping((prev) => ({ ...prev, [field]: value }));
  };
  const convertToProperType = (value: any, field: keyof BookData): any => {
    if (!value || value === "") return null;

    if (field === 'isbn') {
      const cleanedISBN = String(value).replace(/[-\s]/g, "");
      const isbnData = isbn3.parse(cleanedISBN);

      if (!isbnData || !isbnData.isValid) {
        console.warn(`Invalid ISBN detected: ${value}`);
        return null;
      }
    }
    if (
      ["no_of_pages", "no_of_preliminary_pages", "inventory_number", "accession_number", "bill_no"].includes(field)
    ) {
      const num = Number(value);
      return isNaN(num) ? null : num;
    }
    if (["year_of_publication", "date_of_acquisition"].includes(field)) {
      let parsedDate;
      if (typeof value === "string") {
        parsedDate = new Date(value);
        if (isNaN(parsedDate.getTime())) {
          const parts = value.split(/[-/]/);
          if (parts.length === 3) {
            let [year, month, day] = parts.map(Number);
            if (year < 1000) [day, month, year] = [year, month, day];
            parsedDate = new Date(year, month - 1, day);
          }
        }
      } else if (typeof value === "number") {
        parsedDate = new Date((value - 25569) * 86400000);
      }
      if (parsedDate && !isNaN(parsedDate.getTime())) {
        return parsedDate.toISOString().split("T")[0];
      }
      console.warn(`Invalid date detected for field ${field}:`, value);
      return null;
    }
    return String(value);
  };

  const handleImport = () => {
    if (!Object.values(mapping).every((v) => v) || data.length === 0) {
      toast.error("Ensure all fields are mapped and data is available.");
      return;
    }
    const mappedData = data.map((row) => {
      const entry: Partial<BookData> = {};
      Object.entries(mapping).forEach(([field, column]) => {
        const index = headers.indexOf(column);
        //@ts-ignore
        if (index !== -1) entry[field as keyof BookData] = convertToProperType(row[index], field as keyof BookData);
      });
      if (!entry.isbn) {
        toast.error(`Removing row due to invalid ISBN of Book Name ${entry.book_title}`)
        console.log("Removing row due to invalid ISBN:", entry.book_title)
        return null
      }
      return { ...entry, institute_id: "828f0d33-258f-4a92-a235-9c1b30d8882b" };
    }).filter((row) => row !== null)
    console.log(mappedData);
    mutate(
      { resource: "book/create", values: mappedData },
      {
        onSuccess: () => toast.success("Import successful."),
        onError: () => {
          toast.error("Import failed.")
          // router.push("/book-pages/all-books");
        }
      }
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="flex justify-center items-center w-full ">
      <div className="p-6 w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">Library Management - Import Book Data</h2>
        <p className="text-gray-600 text-sm mb-4">Upload an Excel or CSV file containing book data and map the columns.</p>
        {/* File Upload Section */}
        <div
          className={`border-2 rounded-lg p-6 text-center mb-6 transition-colors`}>
          {file ? (
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-2xl">📤</span>
              <p className="text-green-600 font-medium mt-2">{file.name} uploaded successfully!</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-24">
              <p className="text-gray-500 text-sm mb-2">Drag and drop your Excel or CSV file here</p>
              <p className="text-sm text-gray-500 mb-2">OR</p>
              <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
                Select File
                <input type="file" accept={allowedExtensions.join(",")} onChange={handleFileChange} className="hidden" />
              </label>
            </div>
          )}
        </div>

        {/* Column Mapping Section */}
        {file && headers.length > 0 && (
          <>
            <h3 className="text-lg font-medium mb-4">
              Map Excel/CSV Columns to Book Fields
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(mapping).map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-sm text-gray-700 mb-1">{field.replace(/_/g, " ")}</label>
                  <select className="border border-gray-300 rounded p-2" value={mapping[field as keyof BookData] || ""} onChange={(e) => handleMappingChange(field as keyof BookData, e.target.value)}>
                    <option value="">Select</option>
                    {headers.map((header, idx) => (
                      <option key={idx} value={header}>{header}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleImport}>
                Import Data</Button>

              <Link href={"/book-pages/all-books"}>
                <Button>
                  Cancel
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
    </Suspense>
  );
};
export default Import_Books;