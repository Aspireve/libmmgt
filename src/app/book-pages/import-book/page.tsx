"use client";

import React, { useEffect, useState } from "react";
import { useCreate } from "@refinedev/core";
import { BookDataBuilder } from "@/utilities/book_builder";
import { toast } from "sonner";
import { fieldLabels, initialMapping } from "./mapdata";
import * as isbn3 from "isbn3";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { StepFunction, useMultiStepLoader } from "@/utilities/use-multi-state-loader";
import { AddBookType, BookImportField } from "@/types/book";
import { useRouter } from "next/navigation";
import { useFileProcessor } from "@/hooks/file-processsor";
import MappingDropdown from "@/components/custom/mapping-dropdown";
import Dropzone from "@/components/custom/dropzone";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import MultiStepLoader from "@/components/multi-step-loader/Multisteploader";
import { ImportBookBC } from "@/components/breadcrumb/constant";

const ImportBooks = () => {
  const [mapping, setMapping] = useState<Partial<BookImportField>>(initialMapping);
  const { mutate } = useCreate();
  const { processFile, importData, clearData } = useFileProcessor();
  const router = useRouter();

  const removedEntries: Partial<BookImportField>[] = [];

  const { institute_uuid, institute_name } = useSelector((state: RootState) => state.auth.currentInstitute);

  useEffect(() => {
    if (importData && importData.headers?.length) {
      setMapping((prevMapping) => {
        const updatedMapping = { ...prevMapping };
        Object.keys(fieldLabels).forEach((field) => {
          if (!updatedMapping[field as keyof BookImportField]) {
            const match = importData.headers.find(
              (header: string) => header.toLowerCase() === field.toLowerCase()
            );
            if (match) {
              updatedMapping[field as keyof BookImportField] = match;
            }
          }
        });
        return updatedMapping;
      });
    }
  }, [importData]);

  const steps: StepFunction<AddBookType[]>[] = [
    async () => new Promise((resolve) => setTimeout(resolve, 1000)),
    async () => {
      const mapped: AddBookType[] = importData.data
        .map((row: any) =>
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
            .setCustomField("institute_uuid", institute_uuid || null)
            .setCustomField("institute_name", institute_name || null)
            .build()
        )
        // .map((entry) => ({
        //   ...entry,
        //   institute_uuid: institute_uuid ?? undefined,
        // }))
        .filter((entry) => {
          const isValidISBN = entry.isbn && isbn3.parse(entry.isbn)?.isValid;
          if (!isValidISBN) {
            removedEntries.push(entry);
            return false;
          }
          return true;
        });

      if (mapped.length === 0) {
        throw new Error("No valid data to import.");
      }
      return mapped;
    },
    async (mappedData) => {
      return new Promise((resolve, reject) => {
        mutate(
          { resource: "book_v2/bulk-create", values: mappedData },
          {
            onSuccess: () => {
              toast.success("Books Added Successfully");
              resolve([]);
            },
            onError: () => {
              toast.error("Import Failed");
              reject(new Error("Failed to import Books"));
            },
          }
        );
      });
    },
    async () => {
      clearData();
      return [];
    },
  ];

  const { isLoading, currentStep, errorMessage, startProcessing } =
    useMultiStepLoader<AddBookType[]>(steps);

  const handleMapData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await startProcessing();
    router.back();
  };

  return (
    <>
    <ImportBookBC/>
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Import Book Data</h2>
      <p className="text-gray-600 text-sm mb-4">
        Upload an Excel or CSV file and map columns.
      </p>
      <Dropzone processFile={processFile} selectedFile={importData} clearSelectedFile={clearData} />
      {importData.title && importData.headers.length > 0 && (
        <form onSubmit={handleMapData}>
          <h3 className="text-lg font-medium mb-4">Map Columns</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MappingDropdown<AddBookType>
              label="Book Title"
              importData={importData}
              isRequired={true}
              mapping={mapping}
              setMapping={setMapping}
              fieldKey={"book_title"}
            />
            <MappingDropdown<AddBookType>
              label="Book Author"
              importData={importData}
              isRequired={true}
              mapping={mapping}
              setMapping={setMapping}
              fieldKey={"book_author"}
            />
            <MappingDropdown<AddBookType>
              label="Name of Publisher"
              importData={importData}
              isRequired={true}
              mapping={mapping}
              setMapping={setMapping}
              fieldKey={"name_of_publisher"}
            />
            <MappingDropdown<AddBookType>
              label="Place of Publication"
              importData={importData}
              isRequired={true}
              mapping={mapping}
              setMapping={setMapping}
              fieldKey={"place_of_publication"}
            />
            <MappingDropdown<AddBookType>
              label="Year of Publication"
              importData={importData}
              isRequired={true}
              mapping={mapping}
              setMapping={setMapping}
              fieldKey={"year_of_publication"}
            />
            <MappingDropdown<AddBookType>
              label="Year of Publication"
              importData={importData}
              isRequired={true}
              mapping={mapping}
              setMapping={setMapping}
              fieldKey={"year_of_publication"}
            />
            <MappingDropdown<AddBookType>
              label="Language"
              importData={importData}
              isRequired={true}
              mapping={mapping}
              setMapping={setMapping}
              fieldKey={"language"}
            />
            <MappingDropdown<AddBookType>
              label="Edition"
              importData={importData}
              isRequired={true}
              mapping={mapping}
              setMapping={setMapping}
              fieldKey={"edition"}
            />
            <MappingDropdown<AddBookType>
              label="ISBN"
              importData={importData}
              isRequired={true}
              mapping={mapping}
              setMapping={setMapping}
              fieldKey={"isbn"}
            />
            <MappingDropdown<AddBookType>
              label="Number of Pages"
              importData={importData}
              isRequired={true}
              mapping={mapping}
              setMapping={setMapping}
              fieldKey={"no_of_pages"}
            />
            <MappingDropdown<AddBookType>
              label="Number of Preliminary Pages"
              importData={importData}
              isRequired={true}
              mapping={mapping}
              setMapping={setMapping}
              fieldKey={"no_of_preliminary"}
            />
            <MappingDropdown<AddBookType>
              label="Subject"
              importData={importData}
              isRequired={true}
              mapping={mapping}
              setMapping={setMapping}
              fieldKey={"subject"}
            />
            <MappingDropdown<AddBookType>
              label="Department"
              importData={importData}
              isRequired={true}
              mapping={mapping}
              setMapping={setMapping}
              fieldKey={"department"}
            />
            <MappingDropdown<AddBookType>
              label="Call Number"
              importData={importData}
              isRequired={true}
              mapping={mapping}
              setMapping={setMapping}
              fieldKey={"call_number"}
            />
            <MappingDropdown<AddBookType>
              label="Author Mark"
              importData={importData}
              isRequired={true}
              mapping={mapping}
              setMapping={setMapping}
              fieldKey={"author_mark"}
            />
            <MappingDropdown<AddBookType>
              label="Source of Acquisition"
              importData={importData}
              isRequired={true}
              mapping={mapping}
              setMapping={setMapping}
              fieldKey={"source_of_acquisition"}
            />
            <MappingDropdown<AddBookType>
              label="Source of Acquisition"
              importData={importData}
              isRequired={true}
              mapping={mapping}
              setMapping={setMapping}
              fieldKey={"source_of_acquisition"}
            />
            <MappingDropdown<AddBookType>
              label="Date of Acquisition"
              importData={importData}
              isRequired={true}
              mapping={mapping}
              setMapping={setMapping}
              fieldKey={"date_of_acquisition"}
            />
            <MappingDropdown<AddBookType>
              label="Inventory Number"
              importData={importData}
              isRequired={true}
              mapping={mapping}
              setMapping={setMapping}
              fieldKey={"inventory_number"}
            />
            <MappingDropdown<AddBookType>
              label="Accession Number"
              importData={importData}
              isRequired={true}
              mapping={mapping}
              setMapping={setMapping}
              fieldKey={"accession_number"}
            />
            <MappingDropdown<AddBookType>
              label="Barcode"
              importData={importData}
              isRequired={true}
              mapping={mapping}
              setMapping={setMapping}
              fieldKey={"barcode"}
            />
            <MappingDropdown<AddBookType>
              label="Item Type"
              importData={importData}
              isRequired={true}
              mapping={mapping}
              setMapping={setMapping}
              fieldKey={"item_type"}
            />
            <MappingDropdown<AddBookType>
              label="Bill Number"
              importData={importData}
              isRequired={true}
              mapping={mapping}
              setMapping={setMapping}
              fieldKey={"bill_no"}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className={`my-6 bg-[#1E40AF] hover:bg-[#1E40AF] transition-all duration-300 cursor-pointer w-full text-white px-4 py-2 rounded flex items-center justify-center ${isLoading ? "opacity-50 cursor-not-allowed" : ""
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
      {isLoading && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <MultiStepLoader loading={isLoading} currentStep={currentStep} errorMessage={errorMessage} />
        </div>
      )}
    </div>
    </>
    
  );
};

export default ImportBooks;
