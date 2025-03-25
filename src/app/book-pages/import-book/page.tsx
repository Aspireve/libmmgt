"use client";

import React, { useState } from "react";
import { useCreate } from "@refinedev/core";
import { Loader2 } from "lucide-react";
import { BookDataBuilder } from "@/utilities/book_builder";
import { Button } from "@/components/ui/button";
import Dropzone from "@/components/custom/dropzone";
import { toast } from "sonner";
import { useFileProcessor } from "@/hooks/file-processsor";
import { BookData } from "../types/data";
import { fieldLabels, initialMapping, MappingType } from "./mapdata";
import * as isbn3 from "isbn3";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const ImportBooks = () => {
  const [mapping, setMapping] = useState<MappingType>(initialMapping);
  const { mutate, isLoading } = useCreate();
  const { processFile, importData, clearData } = useFileProcessor();

  const removedEntries: Partial<BookData>[] = [];

  const institute_uuid = useSelector((state: RootState) => state.auth.institute_uuid);

  const handleMappingChange = (field: keyof BookData, value: string) => {
    setMapping((prev) => ({ ...prev, [field]: value }));
  };

  const handleMapData = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    e.preventDefault();
    if (Object.values(mapping).some((value) => value === "")) {
      for (const key in mapping) {
        if (mapping[key as keyof BookData] === "") {
          mapping[key as keyof BookData] = key;
        }
      }
    }

    const mapped = importData.data
      .map((row) =>
        new BookDataBuilder(row, mapping, importData.headers)
          .setField("isbn", (value) => value)
          .setField("book_title")
          .setField("book_author")
          .setField("name_of_publisher")
          .setField("place_of_publication")
          .setField("year_of_publication")
          .setField("language")
          .setField("edition")
          .setField("no_of_pages")
          .setField("no_of_preliminary")
          .setField("subject")
          .setField("department")
          .setField("call_number")
          .setField("author_mark")
          .setField("source_of_acquisition")
          .setField("date_of_acquisition")
          .setField("inventory_number")
          .setField("accession_number")
          .setField("barcode")
          .setField("item_type")
          .setField("bill_no")
          .build()
      ).map((entry) => ({
        ...entry,
        institute_uuid: institute_uuid ?? undefined,
      }))
      .filter((entry) => {
        const isValidISBN = entry.isbn && isbn3.parse(entry.isbn)?.isValid;
        if (!isValidISBN) {
          removedEntries.push(entry);
          return false;
        }
        return true;
      });

    if (mapped.length === 0) {
      toast.error("No valid data to import.");
      return;
    }

    mutate(
      { resource: "book_v2/bulk-create", values: mapped },
      {
        onSuccess: ({ data }) => {
          if (!data?.body?.locked) {
            toast.error("Import Failed");
            return;
          }
          toast.success("Books Added Successfully");
          clearData();
        },
        onError: () => toast.error("Import Failed"),
      }
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Import Book Data</h2>
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
              const fieldKey = field as keyof BookData;
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

export default ImportBooks;

