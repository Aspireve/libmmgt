"use client";

import React, { useEffect, useState } from "react";
import { useCreate } from "@refinedev/core";
import { Loader2 } from "lucide-react";
import { StudentDataBuilder } from "@/utilities/student_builder";
import { Button } from "@/components/ui/button";
import Dropzone from "@/components/custom/dropzone";
import { toast } from "sonner";
import { fieldLabels, initialMapping } from "@/constants/students";
import { useFileProcessor } from "@/hooks/file-processsor";
import type { StudentData, StudentMappingType } from "@/types/student";

const ImportStudents = () => {
  const [mapping, setMapping] = useState<StudentMappingType>(initialMapping);
  const { mutate, isLoading } = useCreate();
  const { processFile, importData, clearData } = useFileProcessor();

  const handleMappingChange = (field: keyof StudentData, value: string) => {
    setMapping((prev) => ({ ...prev, [field]: value }));
  };

  const handleMapData = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    e.preventDefault();
    if (Object.values(mapping).some((value) => value === "")) {
      for (const key in mapping) {
        if (mapping[key as keyof StudentData] === "") {
          mapping[key as keyof StudentData] = key;
        }
      }
    }

    const mapped = importData.data
      .map((row) =>
        new StudentDataBuilder(row, mapping, importData.headers)
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
      )
      .filter((entry) => Object.keys(entry).length > 0);

    if (mapped.length === 0) {
      toast.error("Insufficient Data Provided");
      return;
    }
    mutate(
      { resource: "student/bulk-create", values: mapped },
      {
        onSuccess: ({ data }) => {
          console.log("API response:", data);
          // if (data?.body?.success) {
          toast.success("Students Added Successfully");
          clearData();
          // } else {
          //   toast.error("Import Failed");
          // }
        },
        onError: () => toast.error("Import Failed"),
      }
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Import Student Data</h2>
      <p className="text-gray-600 text-sm mb-4">
        Upload an Excel or CSV file and map columns.
      </p>
      <Dropzone
        processFile={processFile}
        selectedFile={importData}
        clearSelectedFile={clearData}
      />
      {importData.title && importData.headers.length > 0 && (
        <form onSubmit={handleMapData}>
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
                      importData.headers.includes(fieldKey)
                        ? fieldKey
                        : mapping[fieldKey] || ""
                    }
                    required={true}
                    onChange={(e) =>
                      handleMappingChange(fieldKey, e.target.value)
                    }
                  >
                    {/* excelHeaders.includes(fieldKey) ? fieldKey : "" */}
                    <option value="">Select Column</option>
                    {importData.headers.map((header, index) => (
                      <option key={index} value={header}>
                        {header}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className={`my-6 bg-[#1E40AF] hover:bg-[#1E40AF] transition-all duration-300 cursor-pointer w-full text-white px-4 py-2 rounded flex items-center justify-center ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Importing...
              </>
            ) : (
              "Import Data"
            )}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ImportStudents;
