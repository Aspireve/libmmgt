"use client";

import React, { Suspense, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { useForm } from "@refinedev/react-hook-form";
import { useCreate, useOne } from '@refinedev/core';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Header from '@/app/Header/header';
import Tabbing from '@/app/Tab/Tab';
import { Loader2 } from 'lucide-react';
import { InputField } from '@/components/custom/inputfield';
import { addbookRoutes } from '@/app/book-pages/types/routes';
import { JournalData } from '../types/data';
import { validateISSN } from '@/hooks/issnValidater';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';

const AddJournal = () => {

  const router = useRouter();
  const [issn, setIssn] = useState("");
  const { mutate, isLoading: createLoading } = useCreate();
  const [isReadable, setIsReadable] = useState(false)
  const [isDisable, setIsDisable] = useState(true)
  const [category, setCategory] = useState("");

    const institute_uuid = useSelector((state: RootState) => state.auth.institute_uuid);
      const institute_name = useSelector((state: RootState) => state.auth.institute_name);
    
  

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const { data, refetch } = useOne<JournalData>({
    resource: "periodical/issn",
    id: `_issn=${issn}`
  })

  useEffect(() => {
    if (issn.length === 8 || issn.length === 9) {
      const sortedIssn = issn.replace(/-/g, "").toUpperCase();
      const parsedISSN = validateISSN(sortedIssn)

      if (!parsedISSN) {
        toast.error("Invalid ISSN format. Please enter a valid ISSN");
        setIsDisable(false);
        return;
      }

      const fetchData = async () => {

        try {
          const resource = await refetch();
          const issnResp = resource?.data?.data;
          const journalData = Array.isArray(issnResp) && issnResp.length > 0 ? issnResp[0] : {};
          if (!journalData || typeof journalData !== "object" || Object.keys(journalData).length === 0) {
            toast.error("No journal found for this ISSN.");
            setIsDisable(false);
            return;
          }
          Object.keys(journalData).forEach((key) => {
            let value = journalData[key as keyof JournalData];
            if (key === "subscription_start_date" || key === "subscription_end_date") {
              value = value ? new Date(value).toISOString().split("T")[0] : "";
            }
            setValue(key as keyof JournalData, value as never);
          });

          toast.success("Journal data mapped successfully!");
          setIsReadable(true);
          setIsDisable(false);
        } catch (error) {
          toast.error("No ISSN is found.");
          setIsDisable(false);
        }
      };

      fetchData();
    }
  }, [issn, refetch, setValue]);

  const onSubmit = (data: any) => {
    const formattedData: JournalData = {
      ...data,
      subscription_price: parseInt(data.subscription_price.toString(), 10),
      barcode:"BARCODE",  // TODO ask tanvir if Barcode is required || not
      institute_uuid:institute_uuid ?? " ",
      institute_name:institute_name ?? " ",
    }
    mutate(
      { resource: "periodical/create-periodical", values: formattedData },
      {
        onSuccess: () => {
          toast.success("Journal added successfully!", { position: 'top-left' })

        },
        onError: (error) => toast.error("Error adding Journal: " + error.message),
      }
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <Header heading="Add Journal" subheading="Tanvir Chavan" />

        <Tabbing routes={addbookRoutes} className='w-[20%]' />
        <section className='p-10'>
          <div className="container">
            {/* Dropdown  */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <h2>General Information</h2>
                <div className="grid grid-cols-4 gap-4 p-4">
                  <InputField
                    label="Title of Journal"
                    name="journal_title"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Name of Journal is required",
                    }}
                    placeholder="Enter Name of Journal"
                  />
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
                  />
                  <InputField
                    label="Place of Publication"
                    name="place_of_publication"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Place of Publisher is required",
                    }}
                    placeholder="Enter Place of Publisher"
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
                  />
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
                  />
                  <InputField
                    label="Subscription End Date"
                    name="subscription_start_date"
                    register={register}
                    errors={errors}
                    type="date"
                    validation={{
                      required: "Subscription End Date is required",
                    }}
                    placeholder="Enter Subscription End Date"
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
                  />
                  <InputField
                    label="Issue Number"
                    name="issue_no"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Issue Number is required",
                    }}
                    placeholder="Enter Issue Number"
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
                  />
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
                  />
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
                  />
                </div>
                <h2>Acquisition & Library Information</h2>
                <div className="grid grid-cols-4 gap-4 p-4">
                  <InputField
                    label='Vendor Name'
                    name="vendor_name"
                    register={register}
                    errors={errors}
                    type='text'
                    validation={{
                      required: "Vendor Name is required",
                    }}
                    placeholder="Enter Vendor Name"
                  />
                  <InputField
                    label='Library Name'
                    name="library_name"
                    register={register}
                    errors={errors}
                    type='text'
                    validation={{
                      required: "Library Name is required",
                    }}
                    placeholder="Enter Library Name"
                  />
                  <div className='text-[#717680]'>
                    <Label>Category</Label>
                    <Select
                      onValueChange={(value) => {
                        setCategory(value);
                        setValue("category", value);
                      }}
                      value={category}
                    >
                      <SelectTrigger className="w-full p-2 border border-[#717680] rounded">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="journal">Journal</SelectItem>
                        <SelectItem value="magazine">Magazine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                </div>


              </div>
              <div className='flex justify-center gap-6'>
                <Button type='button' onClick={() => router.back()}>Cancel</Button>
                <Button
                  type="submit"
                  className="bg-[#1E40AF] text-white rounded-[10px] hover:bg-[#1E40AF]"
                  disabled={createLoading}
                >
                  {createLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Adding Journal...
                    </>
                  ) : (
                    "Add Journal"
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

export default AddJournal