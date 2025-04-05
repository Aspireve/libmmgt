"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "@refinedev/react-hook-form";
import { useCreate, useOne } from "@refinedev/core";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Header from "@/app/Header/header";
import isbn3 from "isbn3";
import { InputField } from "@/components/custom/inputfield";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { AddBookType } from "@/types/book";
import { AddBookBC } from "@/components/breadcrumb/constant";
import Tabbing from "@/app/Tab/Tab";
import { addbookRoutes } from "../types/routes";

const AddBook = () => {
  const router = useRouter();
  const [isbn, setIsbn] = useState("");
  const { mutate, isLoading: createLoading } = useCreate();
  const [isReadable, setIsReadable] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  enum LibraryTabs {
    ADDBOOK = "Add Book",
    ADDPERIODICAL = "Add Periodical",
  }

  const TABS = [
    { key: LibraryTabs.ADDBOOK, label: "Add Book" },
    { key: LibraryTabs.ADDPERIODICAL, label: "Add Periodical" },
  ];

  const { institute_uuid, institute_name } = useSelector(
    (state: RootState) => state.auth.currentInstitute
  );

  const { data: bookData, refetch } = useOne<AddBookType>({
    resource: "book_v2/isbn",
    id: `_isbn=${isbn}`,
    queryOptions: {
      retry: 1,
      enabled: false,
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isbn.length === 10 || isbn.length === 13 || isbn.length === 17) {
      const sortedIsbn = isbn.replace(/-/g, "").toUpperCase();
      const parsedISBN = isbn3.parse(sortedIsbn);

      if (!parsedISBN) {
        toast.error(
          "Invalid ISBN format. Please enter a valid ISBN-10 or ISBN-13."
        );
        setIsDisable(false);
        return;
      }

      const fetchData = async () => {
        try {
          const resource = await refetch();
          console.log(resource?.data?.data);
          const isbnResp = resource?.data?.data;
          const bookData =
            Array.isArray(isbnResp) && isbnResp.length > 0 ? isbnResp[0] : {};
          if (
            !bookData ||
            typeof bookData !== "object" ||
            Object.keys(bookData).length === 0
          ) {
            toast.error("No book found for this ISBN.");
            setIsDisable(false);
            return;
          }
          Object.keys(bookData).forEach((key) => {
            let value = bookData[key as keyof AddBookType];

            if (
              key === "year_of_publication" ||
              key === "date_of_acquisition"
            ) {
              value = value ? new Date(value).toISOString().split("T")[0] : "";
            }

            setValue(key as keyof AddBookType, value as never);
          });

          toast.success("Book data mapped successfully!");
          setIsReadable(true);
          setIsDisable(false);
        } catch (error) {
          toast.error("No ISBN is found.");
          setIsDisable(false);
        }
      };

      fetchData();
    }
  }, [isbn, refetch, setValue]);

  const onSubmit = (data: any) => {
    const formatDate = (dateString: string | undefined) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date.toISOString().split("T")[0];
    };
    // if (data?.title_images !== null) delete data.title_images;
    delete data.title_images;
    delete data.remarks;
    delete data.title_additional_fields;
    delete data.title_description;

    const formattedData: AddBookType = {
      ...data,
      no_of_pages: data.no_of_pages.toString(),
      no_of_preliminary: data.no_of_preliminary.toString(),
      year_of_publication: formatDate(data.year_of_publication),
      date_of_acquisition: formatDate(data.date_of_acquisition),
      institute_uuid,
      institute_name,
    };
    mutate(
      { resource: "book_v2/create", values: formattedData },
      {
        onSuccess: () => {
          toast.success("Book added successfully!");
          router.push("/book-pages/all-books");
        },
        onError: () => toast.error("Error adding book"),
      }
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <AddBookBC />
        <Header heading="Add Book" subheading="Tanvir Chavan" />
        <Tabbing routes={addbookRoutes} className="w-[23%]" />
        <section className="p-10 pt-0">
          <div className="container">
            {/* ISBN Number  */}
            <div>
              <h2 className="ml-[15px]">ISBN Number</h2>
              <div className="grid grid-cols-4 gap-4 p-4">
                <div>
                  <Label>ISBN Number</Label>
                  <Input
                    className="text-[#343232]"
                    type="text"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    placeholder="Enter Book ISBN Number"
                  />
                  <br />
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <h2 className="ml-[15px]">Cataloging</h2>
                <div className="grid grid-cols-4 gap-4 p-4">
                  <InputField
                    label="Book Title"
                    name="book_title"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Book Title is required",
                    }}
                    placeholder="Enter Book Title"
                    readonly={isReadable}
                    disabled={isDisable}
                  />
                  <InputField
                    label="Book Author"
                    name="book_author"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Book Author is required",
                    }}
                    placeholder="Enter Book Author"
                    readonly={isReadable}
                    disabled={isDisable}
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
                    readonly={isReadable}
                    disabled={isDisable}
                  />
                  <InputField
                    label="Place of publication"
                    name="place_of_publication"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Place of publication is required",
                    }}
                    placeholder="Enter Place of publication"
                    readonly={isReadable}
                    disabled={isDisable}
                  />
                  <InputField
                    label="Year of publication"
                    name="year_of_publication"
                    register={register}
                    errors={errors}
                    type="date"
                    validation={{
                      required: "Year of publication is required",
                    }}
                    placeholder="Enter Place of publication"
                    readonly={isReadable}
                    disabled={isDisable}
                    disableFuture={true}
                  />
                  <InputField
                    label="Language"
                    name="language"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Language is required",
                    }}
                    placeholder="Enter Language"
                    readonly={isReadable}
                    disabled={isDisable}
                  />
                  <InputField
                    label="Edition"
                    name="edition"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Edition is required",
                    }}
                    placeholder="Enter Edition"
                    readonly={isReadable}
                    disabled={isDisable}
                  />
                  <InputField
                    label="ISBN"
                    name="isbn"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "ISBN is required",
                    }}
                    placeholder="Enter ISBN"
                    readonly={isReadable}
                    disabled={isDisable}
                  />
                  <InputField
                    label="No. of Pages"
                    name="no_of_pages"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "No. of Pages is required",
                    }}
                    placeholder="Enter No. of Pages"
                    readonly={isReadable}
                    disabled={isDisable}
                  />
                  <InputField
                    label="No. of Preliminary Pages"
                    name="no_of_preliminary"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "No. of Preliminary Pages is required",
                    }}
                    placeholder="Enter No. of Preliminary Pages"
                    readonly={isReadable}
                    disabled={isDisable}
                  />
                  <InputField
                    label="Subject"
                    name="subject"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Subject is required",
                    }}
                    placeholder="Enter Subject"
                    readonly={isReadable}
                    disabled={isDisable}
                  />
                  <InputField
                    label="Department"
                    name="department"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Department is required",
                    }}
                    placeholder="Enter Department"
                    readonly={isReadable}
                    disabled={isDisable}
                  />
                </div>

                <h2 className="ml-[15px]">Classification</h2>
                <div className="grid grid-cols-4 gap-4 p-4">
                  <InputField
                    label="Author Mark"
                    name="author_mark"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Author Mark is required",
                    }}
                    placeholder="Enter Author Mark"
                    readonly={isReadable}
                    disabled={isDisable}
                  />
                  <InputField
                    label="Call Number"
                    name="call_number"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Call Number is required",
                    }}
                    placeholder="Enter Call Number"
                    readonly={isReadable}
                    disabled={isDisable}
                  />
                </div>
                <h2 className="ml-[15px]">Acquisition Details</h2>
                <div className="grid grid-cols-4 gap-4 p-4">
                  <InputField
                    label="Source of Acquisition"
                    name="source_of_acquisition"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Source of Acquisition is required",
                    }}
                    placeholder="Enter Source of Acquisition"
                    readonly={isReadable}
                    disabled={isDisable}
                  />
                  <InputField
                    label="Date of Acquisition"
                    name="date_of_acquisition"
                    register={register}
                    errors={errors}
                    type="date"
                    validation={{
                      required: "Date of Acquisition is required",
                    }}
                    placeholder="Enter Date of Acquisition"
                    readonly={isReadable}
                    disabled={isDisable}
                  />
                  <InputField
                    label="Bill Number"
                    name="bill_no"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Bill Number is required",
                    }}
                    placeholder="Enter Bill Number"
                    readonly={isReadable}
                    disabled={isDisable}
                  />
                </div>
                <h2 className="ml-[15px]">Inventory and Identification</h2>
                <div className="grid grid-cols-4 gap-4 p-4">
                  <InputField
                    label="Inventory Number"
                    name="inventory_number"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Inventory Number is required",
                    }}
                    placeholder="Enter Inventory Number"
                    disabled={isDisable}
                    readonly={false}
                  />
                  <InputField
                    label="Accession Number"
                    name="accession_number"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Accession Number is required",
                    }}
                    placeholder="Enter Accession Number"
                    disabled={isDisable}
                    readonly={false}
                  />
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
                    disabled={isDisable}
                    readonly={false}
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
                    disabled={isDisable}
                    readonly={false}
                  />
                </div>
              </div>

              <div className="flex justify-center gap-6">
                <Button
                  variant="outline"
                  type="button"
                  className="shadow-none text-[#1E40AF] border-[#1E40AF] rounded-[10px]"
                  onClick={() => router.push("/book-pages/all-books")}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="bg-[#1E40AF] text-white rounded-[10px] hover:bg-[#1E40AF]/90"
                  disabled={createLoading}
                >
                  {createLoading ? (
                    <>
                      Adding Book...
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </>
                  ) : (
                    "Add Book"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </section>
        ,
      </>
    </Suspense>
  );
};
export default AddBook;
