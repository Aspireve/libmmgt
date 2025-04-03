"use client"

import React, { useEffect, useState } from 'react'

import { useFileProcessor } from '@/hooks/file-processsor';
import { RootState } from '@/redux/store/store';
import { AddPeriodicalType, PeriodicalImportField } from '@/types/periodical';
import { useCreate } from '@refinedev/core';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { fieldLabels, initialMapping } from "./mapdata";
import { StepFunction, useMultiStepLoader } from '@/utilities/use-multi-state-loader';
import { toast } from 'sonner';
import { PeriodicalDataBuilder } from '@/utilities/periodical_builder';
import MultiStepLoader from '@/components/multi-step-loader/Multisteploader';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MappingDropdown from '@/components/custom/mapping-dropdown';
import Dropzone from '@/components/custom/dropzone';
import { ImportPeriodicalBC } from '@/components/breadcrumb/constant';

const ImportPeriodical = () => {
    const [mapping, setMapping] = useState<Partial<PeriodicalImportField>>(initialMapping);
    const { mutate } = useCreate();
    const { processFile, importData, clearData } = useFileProcessor();
    const router = useRouter();

    const { institute_uuid, institute_name } = useSelector((state: RootState) => state.auth.currentInstitute);

    useEffect(() => {
        if (importData && importData.headers?.length) {
            setMapping((prevMapping) => {
                const updatedMapping = { ...prevMapping };
                Object.keys(fieldLabels).forEach((field) => {
                    if (!updatedMapping[field as keyof PeriodicalImportField]) {
                        const match = importData.headers.find(
                            (header: string) => header.toLowerCase() === field.toLowerCase()
                        );
                        if (match) {
                            updatedMapping[field as keyof PeriodicalImportField] = match;
                        }
                    }
                });
                return updatedMapping;
            });
        }
    }, [importData]);

    const steps: StepFunction<AddPeriodicalType[]>[] = [
        async () => new Promise((resolve) => setTimeout(resolve, 1000)),
        async () => {
            const mapped: AddPeriodicalType[] = importData.data
                .map((row: any) =>
                    new PeriodicalDataBuilder(row, mapping, importData.headers)
                        .setField("journal_title")
                        .setField("name_of_publisher")
                        .setField("place_of_publication")
                        .setField("editor_name")
                        .setField("subscription_id")
                        .setField("subscription_price")
                        .setField("subscription_start_date")
                        .setField("subscription_end_date")
                        .setField("volume_no")
                        .setField("issue_number")
                        .setField("frequency")
                        .setField("item_type")
                        .setField("issn")
                        .setField("classification_number")
                        .setField("vendor_name")
                        .setField("library_name")
                        .setField("category")
                        .setField("barcode")
                        .setCustomField("institute_uuid", institute_uuid || null)
                        .setCustomField("institute_name", institute_name || null)
                        .build()
                )
                // .map((entry) => ({
                //   ...entry,
                //   institute_uuid: institute_uuid ?? undefined,
                // }))
                .filter((entry) => console.log("filter"));

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
        useMultiStepLoader<AddPeriodicalType[]>(steps);

    const handleMapData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await startProcessing();
        router.back();
    };

    return (
        <>
            <ImportPeriodicalBC />
            <div className="container mx-auto p-6">
                <h2 className="text-xl font-semibold mb-4">Import Periodicals Data</h2>
                <p className="text-gray-600 text-sm mb-4">
                    Upload an Excel or CSV file and map columns.
                </p>
                
        <div className="border-2 border-dashed border-gray-300 p-6 rounded-[10px] bg-white shadow-sm flex flex-col items-center justify-center text-center">
          <Dropzone
            processFile={processFile}
            selectedFile={importData}
            clearSelectedFile={clearData}
          />
        </div>
                {importData.title && importData.headers.length > 0 && (
                    <form onSubmit={handleMapData}>
                        <h3 className="text-lg font-medium mb-4">Map Columns</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <MappingDropdown<AddPeriodicalType>
                                label="Journal Title"
                                importData={importData}
                                isRequired={true}
                                mapping={mapping}
                                setMapping={setMapping}
                                fieldKey={"journal_title"}
                            />
                            <MappingDropdown<AddPeriodicalType>
                                label="Name of Publisher"
                                importData={importData}
                                isRequired={true}
                                mapping={mapping}
                                setMapping={setMapping}
                                fieldKey={"name_of_publisher"}
                            />
                            <MappingDropdown<AddPeriodicalType>
                                label="Place of Publication"
                                importData={importData}
                                isRequired={true}
                                mapping={mapping}
                                setMapping={setMapping}
                                fieldKey={"place_of_publication"}
                            />
                            <MappingDropdown<AddPeriodicalType>
                                label="Editor Name"
                                importData={importData}
                                isRequired={true}
                                mapping={mapping}
                                setMapping={setMapping}
                                fieldKey={"editor_name"}
                            />
                            <MappingDropdown<AddPeriodicalType>
                                label="Subscription Id"
                                importData={importData}
                                isRequired={true}
                                mapping={mapping}
                                setMapping={setMapping}
                                fieldKey={"subscription_id"}
                            />
                            <MappingDropdown<AddPeriodicalType>
                                label="Subscription Price"
                                importData={importData}
                                isRequired={true}
                                mapping={mapping}
                                setMapping={setMapping}
                                fieldKey={"subscription_price"}
                            />
                            <MappingDropdown<AddPeriodicalType>
                                label="Subscription Start Data"
                                importData={importData}
                                isRequired={true}
                                mapping={mapping}
                                setMapping={setMapping}
                                fieldKey={"subscription_start_date"}
                            />
                            <MappingDropdown<AddPeriodicalType>
                                label="Subscription Start Data"
                                importData={importData}
                                isRequired={true}
                                mapping={mapping}
                                setMapping={setMapping}
                                fieldKey={"subscription_start_date"}
                            />
                            <MappingDropdown<AddPeriodicalType>
                                label="Subscription End Data"
                                importData={importData}
                                isRequired={true}
                                mapping={mapping}
                                setMapping={setMapping}
                                fieldKey={"subscription_end_date"}
                            />
                            <MappingDropdown<AddPeriodicalType>
                                label="Volume Number"
                                importData={importData}
                                isRequired={true}
                                mapping={mapping}
                                setMapping={setMapping}
                                fieldKey={"volume_no"}
                            />
                            <MappingDropdown<AddPeriodicalType>
                                label="Issue Number"
                                importData={importData}
                                isRequired={true}
                                mapping={mapping}
                                setMapping={setMapping}
                                fieldKey={"issue_number"}
                            />
                            <MappingDropdown<AddPeriodicalType>
                                label="Frequency"
                                importData={importData}
                                isRequired={true}
                                mapping={mapping}
                                setMapping={setMapping}
                                fieldKey={"frequency"}
                            />
                            <MappingDropdown<AddPeriodicalType>
                                label="Item Type"
                                importData={importData}
                                isRequired={true}
                                mapping={mapping}
                                setMapping={setMapping}
                                fieldKey={"item_type"}
                            />
                            <MappingDropdown<AddPeriodicalType>
                                label="ISSN"
                                importData={importData}
                                isRequired={true}
                                mapping={mapping}
                                setMapping={setMapping}
                                fieldKey={"issn"}
                            />
                            <MappingDropdown<AddPeriodicalType>
                                label="Classification Number"
                                importData={importData}
                                isRequired={true}
                                mapping={mapping}
                                setMapping={setMapping}
                                fieldKey={"classification_number"}
                            />
                            <MappingDropdown<AddPeriodicalType>
                                label="Vendor Name"
                                importData={importData}
                                isRequired={true}
                                mapping={mapping}
                                setMapping={setMapping}
                                fieldKey={"vendor_name"}
                            />
                            <MappingDropdown<AddPeriodicalType>
                                label="Classification Number"
                                importData={importData}
                                isRequired={true}
                                mapping={mapping}
                                setMapping={setMapping}
                                fieldKey={"classification_number"}
                            />
                            <MappingDropdown<AddPeriodicalType>
                                label="Library Name"
                                importData={importData}
                                isRequired={true}
                                mapping={mapping}
                                setMapping={setMapping}
                                fieldKey={"library_name"}
                            />
                            <MappingDropdown<AddPeriodicalType>
                                label="Category"
                                importData={importData}
                                isRequired={true}
                                mapping={mapping}
                                setMapping={setMapping}
                                fieldKey={"category"}
                            />
                            <MappingDropdown<AddPeriodicalType>
                                label="Barcode"
                                importData={importData}
                                isRequired={true}
                                mapping={mapping}
                                setMapping={setMapping}
                                fieldKey={"barcode"}
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
    )
}

export default ImportPeriodical