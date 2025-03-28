"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@refinedev/react-hook-form";
import { useOne } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import Header from "@/app/Header/header";
import { Loader2 } from "lucide-react";
import { JournalData } from "../types/data";
import { InputField } from "@/components/custom/inputfield";
import { dataProvider } from "@/providers/data";
import { toast } from "sonner";

const EditJournal = () => {

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
  
        if (key === "subscription_start_date" ||key === "subscription_end_date")
         {
          value = value ? new Date(value).toISOString().split("T")[0] : "";
        }
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
    delete data.title_additional_fields
    delete data.title_description
    delete data.title_images

    const formattedData: JournalData = {
      ...data,
      subscription_price: parseInt(data.subscription_price.toString(), 10),
    }
    try {
            await dataProvider.patchUpdate({
            resource: 'journals/update-periodical',
            value: formattedData,
          })
    
          toast.success("Book title updated successfully!");
          window.history.back();
        } catch (error: any) {
          toast.error(error.message);
        }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <Header heading="Edit Periodical" subheading="Tanvir Chavan" />

        <section className="p-10">
          <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">


              <h2> General Information</h2>
              <div className="grid grid-cols-4 gap-4 p-4">
                {/* <InputField
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
                /> */}

                <InputField
                  label="Name of Publisher"
                  name="name_of_publisher"
                  register={register}
                  errors={errors}
                  type="text"
                  validation={{
                    required: "Name of Publisher is required",
                  }}
                  placeholder="Enter Name of Publisher"
                  loading={isLoadingInput}
                />
                <InputField
                  label="Place of Publication"
                  name="place_of_publication"
                  register={register}
                  errors={errors}
                  type="text"
                  validation={{
                    required: "Place of Publication is required",
                  }}
                  placeholder="Enter Place of Publication"
                  loading={isLoadingInput}
                />
                {/* <InputField
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
                /> */}
              </div>
              <h2>Subscription Details</h2>
              <div className="grid grid-cols-4 gap-4 p-4">
                <InputField
                  label="Subscription Price"
                  name="subscription_price"
                  register={register}
                  errors={errors}
                  type="text"
                  validation={{
                    required: "Subscription Price is required",
                  }}
                  placeholder="Enter Subscription Price"
                  loading={isLoadingInput}
                />

                <InputField
                  label="Subscription Start Date"
                  name="subscription_start_date"
                  register={register}
                  errors={errors}
                  type="date"
                  validation={{
                    required: "Subscription Start Date is required",
                  }}
                  placeholder="Enter Subscription Start Date"
                  loading={isLoadingInput}
                />
                <InputField
                  label="Subscription End Date"
                  name="subscription_end_date"
                  register={register}
                  errors={errors}
                  type="date"
                  validation={{
                    required: "Subscription End Date is required",
                  }}
                  placeholder="Enter Subscription End Date"
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

                <InputField
                  label="Issue Number"
                  name="issue_number"
                  register={register}
                  errors={errors}
                  type="text"
                  validation={{
                    required: "Issue Number is required",
                  }}
                  placeholder="Enter Issue Number"
                  loading={isLoadingInput}
                />
              </div>
              <h2>Publication & Classification</h2>
              <div className="grid grid-cols-4 gap-4 p-4">
                <InputField
                  label="Frequency"
                  name="frequency"
                  register={register}
                  errors={errors}
                  type="text"
                  validation={{
                    required: "Frequency is required",
                  }}
                  placeholder="Enter Frequency"
                  loading={isLoadingInput}
                />

                {/* <InputField
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
                /> */}
                {/* <InputField
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
                /> */}
                <InputField
                  label="Classification Number"
                  name="classification_number"
                  register={register}
                  errors={errors}
                  type="text"
                  validation={{
                    required: "Classification Number is required",
                  }}
                  placeholder="Enter Classification Number"
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
                    "Update Journal"
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

export default EditJournal;