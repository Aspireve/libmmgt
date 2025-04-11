"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "@refinedev/react-hook-form";
import { useCreate, useOne } from "@refinedev/core";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Header from "@/components/custom/header";
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

  const instituteName = useSelector(
    (state: RootState) => state.auth.currentInstitute?.instituteName
  );
  const instituteUuid = useSelector(
    (state: RootState) => state.auth.currentInstitute?.instituteUuid
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

  // const onSubmit = (data: any) => {
  //   const formatDate = (dateString: string | undefined) => {
  //     if (!dateString) return null;
  //     const date = new Date(dateString);
  //     return isNaN(date.getTime()) ? null : date.toISOString().split("T")[0];
  //   };
  //   // if (data?.title_images !== null) delete data.title_images;
  //   delete data.title_images;
  //   delete data.remarks;
  //   delete data.title_additional_fields;
  //   delete data.title_description;

  //   const formattedData: AddBookType = {
  //     ...data,
  //     no_of_pages: data.no_of_pages.toString(),
  //     no_of_preliminary: data.no_of_preliminary.toString(),
  //     year_of_publication: formatDate(data.year_of_publication),
  //     date_of_acquisition: formatDate(data.date_of_acquisition),
  //     instituteUuid,
  //     instituteName,
  //   };
  //   mutate(
  //     { resource: "book_v2/create", values: formattedData },
  //     {
  //       onSuccess: () => {
  //         toast.success("Book added successfully!");
  //         router.push("/book-pages/all-books");
  //       },
  //       onError: () => toast.error("Error adding book"),
  //     }
  //   );
  // };
  const onSubmit = (data: any) => {
    const transformedData = {
      ...data,
      copyRemarks:
        typeof data.copyRemarks === "string"
          ? data.copyRemarks
              .split(",")
              .map((item: string) => item.trim())
              .filter(Boolean)
          : Array.isArray(data.copyRemarks)
          ? data.copyRemarks
          : [],
      keyWords:
        typeof data.keyWords === "string"
          ? data.keyWords
              .split(",")
              .map((item: string) => item.trim())
              .filter(Boolean)
          : Array.isArray(data.keyWords)
          ? data.keyWords
          : [],
      titleRemarks:
        typeof data.titleRemarks === "string"
          ? data.titleRemarks
              .split(",")
              .map((item: string) => item.trim())
              .filter(Boolean)
          : Array.isArray(data.titleRemarks)
          ? data.titleRemarks
          : [],
      // dateReceipt: data.dateReceipt ? new Date(data.dateReceipt) : null,
      // billDate: data.billDate ? new Date(data.billDate) : null,
      loanReturnDate: data.loanReturnDate ? data.loanReturnDate : null,
      isAvailable: !!data.isAvailable,
      isArchived: !!data.isArchived,
      loaned: !!data.loaned,
      donated: !!data.donated,
      isBound: !!data.isBound,
      lockStatus: !!data.lockStatus,
      availableCount: +data.availableCount,
      totalCount: +data.totalCount,
      // createdAt: new Date(),
      // updatedAt: new Date(),
      instituteUuid,
      instituteName,
    };

    console.log("Final payload:", transformedData);

    // Call your API or handle the payload here
    // e.g. await api.saveBookCopy(transformedData);
    mutate(
      { resource: "book_v2/create", values: transformedData },
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
                <div className="grid grid-cols-4 gap-4 p-4">
                  {/* Book Title */}
                  <InputField
                    label="Book Title"
                    name="bookTitle"
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

                  {/* Accession Number */}
                  <InputField
                    label="Accession Number"
                    name="accessionNumber"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Accession Number"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* Category Name */}
                  <InputField
                    label="Category Name"
                    name="categoryName"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Category Name"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* Classification Number */}
                  <InputField
                    label="Classification Number"
                    name="classificationNumber"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Classification Number"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* Author 1 */}
                  <InputField
                    label="Author 1"
                    name="author1"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Author 1"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* Author 2 */}
                  <InputField
                    label="Author 2"
                    name="author2"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Author 2"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* Other Authors */}
                  <InputField
                    label="Other Authors"
                    name="otherAuthors"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Other Authors"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* Author Type 1 */}
                  <InputField
                    label="Author Type 1"
                    name="authorType1"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Author Type 1"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* Author Type 2 */}
                  <InputField
                    label="Author Type 2"
                    name="authorType2"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Author Type 2"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* Other Authors Type */}
                  <InputField
                    label="Other Authors Type"
                    name="otherAuthorsType"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Other Authors Type"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* Publisher */}
                  <InputField
                    label="Publisher"
                    name="publisher"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Publisher"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* Place */}
                  <InputField
                    label="Place"
                    name="place"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Place"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* Year of Publication */}
                  <InputField
                    label="Year of Publication"
                    name="yearOfPublication"
                    register={register}
                    errors={errors}
                    type="date"
                    placeholder="Enter Year of Publication"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* Roman Pages */}
                  <InputField
                    label="Roman Pages"
                    name="romanPages"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Roman Pages"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* Numeric Pages */}
                  <InputField
                    label="Numeric Pages"
                    name="numbericPages"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Numeric Pages"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* ISBN */}
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

                  {/* Key Words */}
                  <InputField
                    label="Key Words"
                    name="keyWords"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Key Words"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* Title Remarks */}
                  <InputField
                    label="Title Remarks"
                    name="titleRemarks"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Title Remarks"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* Subject Name */}
                  <InputField
                    label="Subject Name"
                    name="subjectName"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Subject Name"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* Sub Subject Name */}
                  <InputField
                    label="Sub Subject Name"
                    name="subSubjectName"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Sub Subject Name"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* Language */}
                  <InputField
                    label="Language"
                    name="language"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Language"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* Book Series */}
                  <InputField
                    label="Book Series"
                    name="bookSeries"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Book Series"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* Department */}
                  <InputField
                    label="Department"
                    name="departent"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Department"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* Edition */}
                  <InputField
                    label="Edition"
                    name="edition"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Edition"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* Title Images */}
                  <InputField
                    label="Title Images"
                    name="titleImages"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Title Images"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* Total Count */}
                  <InputField
                    label="Total Count"
                    name="totalCount"
                    register={register}
                    errors={errors}
                    type="number"
                    placeholder="Enter Total Count"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  {/* Available Count */}
                  <InputField
                    label="Available Count"
                    name="availableCount"
                    register={register}
                    errors={errors}
                    type="number"
                    placeholder="Enter Available Count"
                    readonly={isReadable}
                    disabled={isDisable}
                  />

                  <InputField
                    label="Price"
                    name="price"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Price"
                    disabled={isDisable}
                    readonly={false}
                  />
                  <InputField
                    label="Supplier Price"
                    name="supplierPrice"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Supplier Price"
                    disabled={isDisable}
                    readonly={false}
                  />
                  {/* <InputField
                    label="Date of Receipt"
                    name="dateReceipt"
                    register={register}
                    errors={errors}
                    type="date"
                    placeholder="Enter Date of Receipt"
                    disabled={isDisable}
                    readonly={false}
                  /> */}
                  <InputField
                    label="Source of Acquisition"
                    name="sourceOfAcquisition"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Source"
                    disabled={isDisable}
                    readonly={false}
                  />
                  <InputField
                    label="Bill No."
                    name="billNo"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Bill Number"
                    disabled={isDisable}
                    readonly={false}
                  />
                  {/* <InputField
                    label="Bill Date"
                    name="billDate"
                    register={register}
                    errors={errors}
                    type="date"
                    placeholder="Enter Bill Date"
                    disabled={isDisable}
                    readonly={false}
                  /> */}
                  <InputField
                    label="Key Number"
                    name="keyNo"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Key Number"
                    disabled={isDisable}
                    readonly={false}
                  />
                  <InputField
                    label="Row Number"
                    name="rowNo"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Row Number"
                    disabled={isDisable}
                    readonly={false}
                  />
                  <InputField
                    label="Copy Remarks"
                    name="copyRemarks"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Remarks (comma separated)"
                    disabled={isDisable}
                    readonly={false}
                  />
                  <InputField
                    label="Loan Return Date"
                    name="loanReturnDate"
                    register={register}
                    errors={errors}
                    type="date"
                    placeholder="Enter Return Date"
                    disabled={isDisable}
                    readonly={false}
                  />
                  <InputField
                    label="Book Number"
                    name="bookNumber"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Book Number"
                    disabled={isDisable}
                    readonly={false}
                  />
                  <InputField
                    label="Book Size"
                    name="bookSize"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Book Size"
                    disabled={isDisable}
                    readonly={false}
                  />
                  <InputField
                    label="Barcode"
                    name="barcode"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Barcode"
                    disabled={isDisable}
                    readonly={false}
                  />
                  <InputField
                    label="Bind Info"
                    name="bindInfo"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Bind Info"
                    disabled={isDisable}
                    readonly={false}
                  />
                  <InputField
                    label="Grant Name"
                    name="grantName"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Grant Name"
                    disabled={isDisable}
                    readonly={false}
                  />
                  <InputField
                    label="Book Condition"
                    name="bookCondition"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Book Condition"
                    disabled={isDisable}
                    readonly={false}
                  />
                  <InputField
                    label="Copy Image URL"
                    name="copyImage"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter Image URL"
                    disabled={isDisable}
                    readonly={false}
                  />
                  <InputField
                    label="Is Available"
                    name="isAvailable"
                    register={register}
                    errors={errors}
                    type="checkbox"
                    disabled={isDisable}
                    readonly={false}
                  />
                  <InputField
                    label="Is Archived"
                    name="isArchived"
                    register={register}
                    errors={errors}
                    type="checkbox"
                    disabled={isDisable}
                    readonly={false}
                  />
                  <InputField
                    label="Loaned"
                    name="loaned"
                    register={register}
                    errors={errors}
                    type="checkbox"
                    disabled={isDisable}
                    readonly={false}
                  />
                  <InputField
                    label="Donated"
                    name="donated"
                    register={register}
                    errors={errors}
                    type="checkbox"
                    disabled={isDisable}
                    readonly={false}
                  />
                  <InputField
                    label="Is Bound"
                    name="isBound"
                    register={register}
                    errors={errors}
                    type="checkbox"
                    disabled={isDisable}
                    readonly={false}
                  />
                  <InputField
                    label="Lock Status"
                    name="lockStatus"
                    register={register}
                    errors={errors}
                    type="checkbox"
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
