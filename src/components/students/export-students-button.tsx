import React from "react";
import { Button } from "../ui/button";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { StudentFromDatabase } from "@/types/student";

const ExportStudent = <TData extends StudentFromDatabase>({
  data,
  refetch,
}: {
  data: TData[];
  refetch: () => void;
}) => {
  if (!data || data.length === 0) return null; 

  const handleExport = () => {
    // Convert selected student data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    // Create a buffer and save file
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(blob, "students.xlsx"); // Download file

  
    refetch();
  };

  return (
    <Button className="border border-[#1E40AF] rounded-[8px] text-[#1E40AF]" onClick={handleExport}>
      {data.length === 1 ? "Export" : "Export All"}
    </Button>
  );
};

export default ExportStudent;
