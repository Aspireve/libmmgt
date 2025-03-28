"use client";

import React, { Suspense, useEffect, useState } from "react";
import Header from '@/app/Header/header';
import { InputField } from '@/components/custom/inputfield';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from "next/navigation";
import { JournalData } from "../types/data";
import { useOne } from "@refinedev/core";
import { dataProvider } from "@/providers/data";
import { toast } from "sonner";
import { useForm } from "@refinedev/react-hook-form";

const editPeriodicalcopy = () => {
     const searchParams = useSearchParams();
      const journal_title_id = searchParams.get("journal_title_id")
      const [isLoadingInput, setIsLoadingInput] = useState(true)
      const [isLoading, setIsLoading] = useState(false)
      const router = useRouter();

      const { data: journalData } = useOne<JournalData>({
        resource: "journals/search-periodicals",
        id: `_journal_title_id=${journal_title_id}` || ""
      });
    
    
      const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
      } = useForm<JournalData>();
    
      const UpdateFields = () => {
        console.log(journalData?.data);
        if (Array.isArray(journalData?.data) && journalData.data.length > 0) {
          const journal = journalData.data[0];
      
          Object.keys(journal).forEach((key) => {
            let value = journal[key as keyof JournalData];
            setValue(key as keyof JournalData, value as never); // Set form values
          });
      
          setIsLoadingInput(false);
        }
      };
      
    useEffect(() => {
      if (!journalData) return;
    
      if (journalData?.data?.error) {
        window.history.back();
      } else {
        UpdateFields();
      }
    }, [journalData, setValue]);
    
    
      const onSubmit = async (data: any) => {
    
        const formattedData: JournalData = {
          ...data,
        }
        try {
                await dataProvider.patchUpdate({
                resource: 'journals/update-periodical',
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
      <Header heading="Edit Periodical Copy" subheading="Tanvir Chavan" />

      <section className="p-10">
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <h2> General Information</h2>
            <div className="grid grid-cols-4 gap-4 p-4">
              <InputField
                label="Periodical Title"
                name="journal_title"
                register={register}
                errors={errors}
                type="text"
                validation={{
                  required: "Title is required",
                }}
                placeholder="Enter Periodical Title"
                loading={isLoadingInput}
              />
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
            <h2>Volume & Issue Details</h2>
            <div className="grid grid-cols-4 gap-4 p-4">
              <InputField
                label="Volume Number"
                name="volume_no"
                register={register}
                errors={errors}
                type="text"
                validation={{
                  required: "Volume Number is required",
                }}
                placeholder="Enter Volume Number"
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
                

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">

              <Button variant="outline" onClick={() => router.back()}>
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

export default editPeriodicalcopy