"use client";

import React, { Suspense, useEffect, useState } from "react";
import { InputField } from '@/components/custom/inputfield';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from "next/navigation";
import { JournalData } from "../types/data";
import { useOne } from "@refinedev/core";
import { dataProvider } from "@/providers/data";
import { toast } from "sonner";
import { useForm } from "@refinedev/react-hook-form";
import { EditPeriodicalCopyBC } from "@/components/breadcrumb/constant";

const EditPeriodicalcopy = () => {
     const searchParams = useSearchParams();
      const journal_copy_id = searchParams.get("journal_copy_id")
      const [isLoadingInput, setIsLoadingInput] = useState(true)
      const [isLoading, setIsLoading] = useState(false)
      const router = useRouter();

      const { data: journalData } = useOne<JournalData>({
        resource: "journals/get-periodical-copy-info",
        id: `_journal_copy_id=${journal_copy_id}` || ""
      });
    
    
      const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
      } = useForm<JournalData>();
  
      
    useEffect(() => {
      if (!journalData) return;
    
      if (journalData?.data?.error) {
        window.history.back();
      } else {
        if (Array.isArray(journalData?.data) && journalData.data.length > 0) {
          const journal = journalData.data[0];
      
          Object.keys(journal).forEach((key) => {
            let value = journal[key as keyof JournalData];
            setValue(key as keyof JournalData, value as never); // Set form values
          });
      
          setIsLoadingInput(false);
        }
      }
    }, [journalData, setValue]);
    
    
      const onSubmit = async (data: any) => {
        delete data.copy_additional_fields
    
        const formattedData: JournalData = {
          ...data,
        }
        try {
                await dataProvider.patchUpdate({
                resource: 'journals/update-periodical-copies',
                value: formattedData,
              })
              toast.success("Updated successfully!");
              window.history.back();
            } catch (error: any) {
              toast.error(error.message);
            }
      }
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <>
      <EditPeriodicalCopyBC/>

      <section className="p-10">
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <h2> General Information</h2>
            <div className="grid grid-cols-4 gap-4 p-4">
              <InputField
                label="Editor Name"
                name="editor_name"
                register={register}
                errors={errors}
                type="text"
                validation={{
                  required: "Editor Name is required",
                }}
                placeholder="Enter Editor Name"
                loading={isLoadingInput}
              />
            </div>
            <h2>Publication & Classification</h2>
            <div className="grid grid-cols-4 gap-4 p-4">
              <InputField
                label="Item Type"
                name="item_type"
                register={register}
                errors={errors}
                type="text"
                validation={{
                  required: "Item Type is required",
                }}
                placeholder="Enter Item Type"
                loading={isLoadingInput}
              />
             <InputField
                label="ISSN"
                name="issn"
                register={register}
                errors={errors}
                type="text"
                validation={{
                  required: "ISSN is required",
                }}
                placeholder="Enter ISSN"
                loading={isLoadingInput}
              />
            </div>
            <h2>Acquisition & Library Information</h2>
            <div className="grid grid-cols-4 gap-4 p-4">
            <InputField
                label="Barcode"
                name="barcode"
                register={register}
                errors={errors}
                type="text"
                validation={{
                  required: "Barcode is required",
                }}
                placeholder="Enter Barcode"
                loading={isLoadingInput}
              />
            </div>
                

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">

              <Button 
              className='shadow-none text-[#1E40AF] rounded-[10px]'
              type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#1E40AF] text-white rounded-[10px] hover:bg-[#1E40AF]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    Updating Journal...
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </>
                ) : (
                  "Update Periodical"
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  </Suspense>
  )
}

export default EditPeriodicalcopy