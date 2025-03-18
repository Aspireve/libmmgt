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
    try {
      if (!file) throw new Error("No file selected.");
      if (!FileProcessor.isSupported(file.type))
        throw new Error("Unsupported file selected.");

      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result;
        if (!data) throw Error("Failed to read file");

        const processor = FileProcessor.getProcessor(file.type);
        const { headers, data: excelData } = processor.process(
          event.target.result as ArrayBuffer
        );

        setImportData({
          title: file.name,
          headers,
          data: excelData,
        });
      };
      reader.readAsArrayBuffer(file);
    } catch (error: any) {
      throw new Error("Error reading file: " + error?.message);
    }
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
