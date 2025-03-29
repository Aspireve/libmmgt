"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useCreate } from "@refinedev/core";
import { StudentDataBuilder } from "@/utilities/student_builder";
import { Button } from "@/components/ui/button";
import Dropzone from "@/components/custom/dropzone";
import { fieldLabels, initialMapping } from "@/constants/students";
import { useFileProcessor } from "@/hooks/file-processsor";
import type { AddStudentType, StudentImportField } from "@/types/student";
import { RootState } from "@/redux/store/store";
import MultiStepLoader from "@/components/multi-step-loader/Multisteploader";
import MappingDropdown from "@/components/custom/mapping-dropdown";
import {
  StepFunction,
  useMultiStepLoader,
} from "@/utilities/use-multi-state-loader";
import { ImportStudentBC } from "@/components/breadcrumb/constant";
import { useRouter } from "next/navigation";

const ImportStudents = () => {
  const [mapping, setMapping] =
    useState<Partial<StudentImportField>>(initialMapping);
  const { mutate } = useCreate();
  const router = useRouter();
  const { processFile, importData, clearData } = useFileProcessor();

  const { institute_name, institute_uuid } = useSelector(
    (state: RootState) => state.auth.currentInstitute
  );

  useEffect(() => {
    if (importData && importData.headers?.length) {
      setMapping((prevMapping) => {
        const updatedMapping = { ...prevMapping };
        Object.keys(fieldLabels).forEach((field) => {
          if (!updatedMapping[field as keyof StudentImportField]) {
            const match = importData.headers.find(
              (header: string) => header.toLowerCase() === field.toLowerCase()
            );
            if (match) {
              updatedMapping[field as keyof StudentImportField] = match;
            }
          }
        });
        return updatedMapping;
      });
    }
  }, [importData]);

  const steps: StepFunction<AddStudentType[]>[] = [
    async () => new Promise((resolve) => setTimeout(resolve, 1000)),
    async () => {
      const mapped: AddStudentType[] = importData.data
        .map((row: any) =>
          new StudentDataBuilder(row, mapping, importData.headers)
            .setField("date_of_birth", (value) => {
              if (!value) return null;
              const parsedDate = new Date(value);
              return !isNaN(parsedDate.getTime())
                ? parsedDate.toISOString().split("T")[0]
                : null;
            })
            .setField("roll_no", (value) => {
              if (!value) return null;
              const num = Number(value);
              return isNaN(num) ? null : num;
            })
            .setField("student_name", (value) => {
              if (!value) {
                throw new Error(`Student name is required`);
              }
              return value;
            })
            .setField("department", (value) => {
              if (!value) {
                throw new Error(`Department is required`);
              }
              return value;
            })
            .setField("email", (value) => {
              if (!value || !/\S+@\S+\.\S+/.test(value)) {
                throw new Error(`Valid email is required`);
              }
              return value;
            })
            .setField("phone_no", (value) => {
              if (!value) {
                throw new Error(`Phone number is required`);
              }
              return value;
            })
            .setField("gender", (value) => {
              if (!value) {
                throw new Error(`Gender is required`);
              }
              return value;
            })
            .setField("address", (value) => value || null)
            .setField("year_of_admission", (value) => value || null)
            .setField("password", (value) => value || null)
            .setCustomField("institute_uuid", institute_uuid || null)
            .setCustomField("institute_name", institute_name || null)
            .build()
        )
        .filter((entry: any) => Object.keys(entry).length > 0);

      if (mapped.length === 0) {
        throw new Error("No valid student data found");
      }
      return mapped; // Return mapped data for the next step
    },
    async (mappedData) => {
      return new Promise((resolve, reject) => {
        mutate(
          { resource: "student/bulk-create", values: mappedData }, // Directly use mapped data
          {
            onSuccess: () => {
              toast.success("Students Added Successfully");
              resolve([]);
            },
            onError: () => {
              toast.error("Import Failed");
              reject(new Error("Failed to import students"));
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
    useMultiStepLoader<AddStudentType[]>(steps);

  const handleMapData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await startProcessing();
    router.back();
  };

  return (
    <>
      <ImportStudentBC />
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
              <MappingDropdown<StudentImportField>
                label="Student Name"
                importData={importData}
                isRequired={true}
                mapping={mapping}
                setMapping={setMapping}
                fieldKey={"student_name"}
              />
              <MappingDropdown<StudentImportField>
                label="Department"
                importData={importData}
                isRequired={true}
                mapping={mapping}
                setMapping={setMapping}
                fieldKey={"department"}
              />
              <MappingDropdown<StudentImportField>
                label="Roll No."
                importData={importData}
                isRequired={true}
                mapping={mapping}
                setMapping={setMapping}
                fieldKey={"roll_no"}
              />
              <MappingDropdown<StudentImportField>
                label="Email"
                importData={importData}
                isRequired={true}
                mapping={mapping}
                setMapping={setMapping}
                fieldKey={"email"}
              />
              <MappingDropdown<StudentImportField>
                label="Phone Number"
                importData={importData}
                isRequired={true}
                mapping={mapping}
                setMapping={setMapping}
                fieldKey={"phone_no"}
              />
              <MappingDropdown<StudentImportField>
                label="Gender"
                importData={importData}
                isRequired={true}
                mapping={mapping}
                setMapping={setMapping}
                fieldKey={"gender"}
              />
              <MappingDropdown<StudentImportField>
                label="Year of Admission"
                importData={importData}
                isRequired={false}
                mapping={mapping}
                setMapping={setMapping}
                fieldKey={"year_of_admission"}
              />
              <MappingDropdown<StudentImportField>
                label="Password"
                importData={importData}
                isRequired={false}
                mapping={mapping}
                setMapping={setMapping}
                fieldKey={"password"}
              />
              <MappingDropdown<StudentImportField>
                label="Date of Birth"
                importData={importData}
                isRequired={false}
                mapping={mapping}
                setMapping={setMapping}
                fieldKey={"date_of_birth"}
              />
              <MappingDropdown<StudentImportField>
                label="Address"
                importData={importData}
                isRequired={false}
                mapping={mapping}
                setMapping={setMapping}
                fieldKey={"address"}
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className={`my-6 bg-[#1E40AF] hover:bg-[#1E40AF] transition-all duration-300 cursor-pointer w-full text-white px-4 py-2 rounded flex items-center justify-center ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Import Data
            </Button>
          </form>
        )}

        {isLoading && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <MultiStepLoader
              loading={isLoading}
              currentStep={currentStep}
              errorMessage={errorMessage}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ImportStudents;
