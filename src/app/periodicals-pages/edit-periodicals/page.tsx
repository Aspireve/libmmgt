"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@refinedev/react-hook-form";
import { useOne, useUpdate } from "@refinedev/core";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import Header from "@/app/Header/header";
import { JournalData } from "@/app/book-pages/types/data";
import { inputJournalFields } from "@/app/book-pages/types/inputFields-title";
import { Loader2 } from "lucide-react";

const EditJournal = () => {
 
  const searchParams = useSearchParams();
  const journal_uuid = searchParams.get("journal_uuid")
  const [isLoadingInput, setIsLoadingInput] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  



  const { data: journalData } = useOne<JournalData>({
    resource: "journals/search",
    id: `journal_uuid=${journal_uuid}` || ""
  });


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<JournalData>();

  const UpdateFields = () => {
    if (journalData?.data) {
      Object.keys(journalData.data).forEach((key) => {
        let value = journalData.data[key as keyof JournalData];
        if (key === "subscription_end_date" || key === "subscription_start_date") {
          if (typeof value === "string" || typeof value === "number") {
            const date = new Date(value);
            value = isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
          } else {
            value = "";
          }
        }
        setValue(key as keyof JournalData, value as never);
        setIsLoadingInput(false)
      });
    }
  }

  useEffect(() => {
    UpdateFields();
  }, [journalData, setValue]);
  // const FormSection = ({ title, fields }: { title: string; fields: any[] }) => (
  //   <div>
  //     <h2>{title}</h2>
  //     <div className="grid grid-cols-4 gap-4 p-4">
  //       {fields.map((field) => (
  //         <div key={field.name}>
  //           <Label>{field.label}</Label>
  //           {isLoadingInput ? (
  //             <Skeleton className="h-4 w-[100%] animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
  //           ) : (
  //             <Input
  //               className="text-[#343232]"
  //               type={field.type}
  //               {...register(field.name, { required: field.required })}
  //               placeholder={field.placeholder}
  //               max={field.type === "date" ? new Date().toISOString().split("T")[0] : undefined}
  //             />
  //           )}
  //           {errors[field.name] && <p className="text-red-500 text-sm">{[field.required]}</p>}
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );

  const onSubmit = (data: any) => {
    const formattedData: JournalData = {
      ...data,
      subscription_price: parseInt(data.subscription_price.toString(), 10),
      // volume_number: parseInt(data.volume_number.toString(), 10),
      // issue_number: parseInt(data.issue_number.toString(), 10),
      frequency: parseInt(data.frequency.toString(), 10),
      year_of_publication: "2023-10-04",
      language: "english",
      department: "Computer Science",
      is_archived: false,
      total_count: 20,
      available_count: 10,
      created_at: "2024-06-11",
      updated_at: "2024-06-11",
      acquistion_date: "2024-06-11"
    }
    // mutate(
    //   {
    //     resource: 'journals/update-journal',
    //     id: journal_uuid || "",
    //     values: formattedData,
    //   },
    //   {
    //     onSuccess: () => {
    //       toast.success("Book Updated successfully!", { position: 'top-left' })
    //       window.history.back();
    //     },
    //     onError: () => toast.error("Something went wrong, Please try again")

    //   }
    // );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <Header heading="Student Directory" subheading="Tanvir Chavan" />

        <section className="p-10">
          <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
             

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

export default EditJournal