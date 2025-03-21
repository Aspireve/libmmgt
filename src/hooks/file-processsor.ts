// useFileProcessor.ts
import { useState } from "react";
import { FileProcessor } from "@/utilities/file_processor";
import type { ImportData } from "@/types/auth";

export const useFileProcessor = () => {
  const [importData, setImportData] = useState<ImportData>({
    title: "",
    headers: [],
    data: [],
  });

  const processFile = (file: File | null) => {
    if (!file) {
      throw new Error("No file selected.");
    }

    // Check if file type is supported or if the file extension is XLSX
    const isXlsx = file.name.toLowerCase().endsWith(".xlsx");
    if (!FileProcessor.isSupported(file.type) && !isXlsx) {
      throw new Error("Unsupported file selected.");
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target?.result;
      if (!data) {
        // Ideally, you might want to set an error state here instead of throwing inside an async callback.
        console.error("Failed to read file");
        return;
      }

      // If file type is XLSX but file.type is not set correctly, we can force the MIME type.
      const fileType = isXlsx
        ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        : file.type;

      const processor = FileProcessor.getProcessor(fileType);
      const { headers, data: excelData } = processor.process(
        event.target.result as ArrayBuffer
      );

      setImportData({
        title: file.name,
        headers,
        data: excelData,
      });
    };

    // Add an error handler for the FileReader.
    reader.onerror = (event) => {
      console.error("Error reading file:", reader.error);
      // You might want to notify the user here via toast.error or similar.
    };

    reader.readAsArrayBuffer(file);
  };

  const clearData = () => {
    setImportData({
      title: "",
      headers: [],
      data: [],
    });
  };

  return { importData, processFile, clearData };
};
