"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@refinedev/react-hook-form";
import { useOne } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import Header from "@/app/Header/header";
import { dataProvider } from "@/providers/data";
import { InputField } from "@/components/custom/inputfield";
import { Loader2 } from "lucide-react";
import { BookEditCopiesData } from "@/types/book";

const EditBook = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const book_uuid = searchParams.get("book_copy_uuid");
    const [isLoading, setIsLoading] = useState(false)
    

    const { data: bookData, isLoading:LoadingDetails } = useOne<BookEditCopiesData>({
        resource: "book_v2/get_book_copy",
        id: `_identifier=${book_uuid}` || ""
    });
    const BookTitle = "Edit Book"
    const BookID = bookData?.data?.book?.book_copy_id;


    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<BookEditCopiesData>();


    useEffect(() => {
        const book = bookData?.data?.book;
        if (!book) {
            console.warn("No book data available");
            return;
        }
        Object.keys(book).forEach((key) => {
            let value = book[key as keyof BookEditCopiesData];
            if (key === "date_of_acquisition") {
                value = value ? new Date(value).toISOString().split("T")[0] : "";
            }
            setValue(key as keyof BookEditCopiesData, value as never);
        });
    }, [bookData, setValue]);

    const onSubmit = async (data: any) => {
        setIsLoading(true)
        const formatDate = (dateString: string | undefined) => {
            if (!dateString) return null;
            const date = new Date(dateString);
            return isNaN(date.getTime()) ? null : date.toISOString().split("T")[0];
        };
        const formattedData: BookEditCopiesData = {
            ...data,
            date_of_acquisition: formatDate(data.date_of_acquisition),
        };
        try {
                await dataProvider.patchUpdate({
                resource: 'book_v2/update_book_copy',
                value: formattedData,
            })
            toast.success("Book title updated successfully!");
            window.history.back();
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <>
                <Header heading={BookTitle} subheading={BookID} />
                <section className="p-10">
                    <div className="container">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <h2>Cataloging</h2>
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
                                        loading={LoadingDetails}
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
                                        loading={LoadingDetails}
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
                                        loading={LoadingDetails}
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
                                        placeholder="Enter barcode"
                                        loading={LoadingDetails}
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
                                        loading={LoadingDetails}
                                    />
                                    <InputField
                                        label="Bill no"
                                        name="bill_no"
                                        register={register}
                                        errors={errors}
                                        type="text"
                                        validation={{
                                            required: "ISBN is required",
                                        }}
                                        placeholder="Enter ISBN"
                                        loading={LoadingDetails}
                                    />
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
                                        loading={LoadingDetails}
                                    />
                                    <InputField
                                        label="Accession Number"
                                        name="accession_number"
                                        register={register}
                                        errors={errors}
                                        type="text"
                                        validation={{
                                            required: "No. of Preliminary Pages is required",
                                        }}
                                        placeholder="Enter Accession Number"
                                        loading={LoadingDetails}
                                    />

                                </div>
                            </div>


                            {/* Action Buttons */}
                            <div className="flex justify-center gap-4">
                                <Button
                                type="button"
                                className="shadow-none text-[#1E40AF] rounded-[10px]"
                                onClick={() => window.history.back()}>
                                Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    className="bg-[#1E40AF] text-white rounded-[10px] hover:bg-[#1E40AF]"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            Updating Book...
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        </>
                                    ) : (
                                        "Update Book"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </section>
            </></Suspense>
    );
};

export default EditBook;
