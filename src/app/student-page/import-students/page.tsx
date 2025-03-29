"use client";

import React, { useEffect, useState } from "react";
import { useCreate } from "@refinedev/core";
import { StudentDataBuilder } from "@/utilities/student_builder";
import { Button } from "@/components/ui/button";
import Dropzone from "@/components/custom/dropzone";
import { toast } from "sonner";
import { fieldLabels, initialMapping } from "@/constants/students";
import { useFileProcessor } from "@/hooks/file-processsor";
import type { StudentData, StudentMappingType } from "@/types/student";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import { CustomBreadcrumb } from "@/components/breadcrumb";
import MultiStepLoader from "@/components/multi-step-loader/Multisteploader";

const ImportStudents = () => {
  const [mapping, setMapping] = useState<StudentMappingType>(initialMapping);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate } = useCreate();
  const { processFile, importData, clearData } = useFileProcessor();

  const institute_uuid = useSelector(
    (state: RootState) => state.auth.institute_uuid
  );
  const institute_name = useSelector(
    (state: RootState) => state.auth.institute_name
  );

  const requiredFields: (keyof StudentData)[] = [
    "student_name",
    "email",
    "roll_no",
    "department",
    "phone_no",
    "institute_name",
    "gender",
  ];

  useEffect(() => {
    if (importData && importData.headers?.length) {
      setMapping((prevMapping) => {
        const updatedMapping = { ...prevMapping };
        Object.keys(fieldLabels).forEach((field) => {
          if (!updatedMapping[field as keyof StudentData]) {
            const match = importData.headers.find(
              (header: string) => header.toLowerCase() === field.toLowerCase()
            );
            if (match) {
              updatedMapping[field as keyof StudentData] = match;
            }
          }
        });
        return updatedMapping;
      });
    }
  }, [importData]);

  const handleMappingChange = (field: keyof StudentData, value: string) => {
    setMapping((prev) => ({ ...prev, [field]: value }));
  };

  const validateRequiredFields = (
    mapping: StudentMappingType,
    importData: any
  ): boolean => {
    console.log("Current Mapping:", mapping); // Debugging line
    for (const field of requiredFields) {
      const mappedValue = mapping[field]; // Fetch the mapped column
      if (!mappedValue || !importData.headers.includes(mappedValue)) {
        toast.error(`Please map the required field: ${fieldLabels[field] || field}`);
        return false;
      }
    }
    return true;
  };
  

  const handleMapData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateRequiredFields(mapping, importData)) {
      return;
    }

    setIsLoading(true);
    setCurrentStep(0);
    setErrorMessage(null);

    // Step 1: Validating Data
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCurrentStep(1);

    // Step 2: Mapping Columns
    const mapped = importData.data
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
          .setField("confirm_password", (value) => value || null)
          .setField("institute_id", (value) => value || null)
          .setField("institute_name", () => institute_name)
          .build()
      )
      .filter((entry: any) => Object.keys(entry).length > 0);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCurrentStep(2);

    if (mapped.length === 0) {
      toast.error("No valid student data found");
      setIsLoading(false);
      return;
    }

    // Step 3: Importing Students
    mutate(
      { resource: "student/bulk-create", values: mapped },
      {
        onSuccess: ({ data }) => {
          console.log("API response:", data);
          setCurrentStep(3); // Move to "Import Complete!"
          setTimeout(() => {
             // Toast after "Import Complete!"
            toast.success("Students Added Successfully");
            setIsLoading(false);
            clearData();
          }, 1000); // Delay toast until after the final step is shown
        },
        onError: (error) => {
          console.error("Import error:", error); 
          setErrorMessage("Failed to import students. Please check your data.");
          setTimeout(() => {
            toast.error("Import Failed");
            setIsLoading(false);
          }, 2000); // Show error briefly before toast
        },
      }
    );
  };

  const breadcrumbItems = [
    { label: "Student Directory", href: "/student-page" },
    { label: "Import Student", href: "/student-page/import-students" },
  ];

  return (
    <>
      <CustomBreadcrumb items={breadcrumbItems} />

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
                const isRequired = requiredFields.includes(fieldKey);
                return (
                  <div key={field} className="flex flex-col">
                    <label
                      className={`text-sm mb-1 ${
                        isRequired
                          ? "text-black-600 font-bold"
                          : "text-gray-700"
                      }`}
                    >
                      {fieldLabels[fieldKey] || fieldKey}{" "}
                      {isRequired && <span className="text-red-500">*</span>}
                    </label>
                    <select
                      className="border border-gray-300 rounded p-2"
                      value={mapping[fieldKey] || ""}
                      required={isRequired}
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