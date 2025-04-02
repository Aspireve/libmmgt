import { InputField } from '@/components/custom/inputfield'
import { EditBookData } from '@/types/book';
import { useOne } from '@refinedev/core';
import { useForm } from '@refinedev/react-hook-form';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const BookTitleDetails = () => {

    const [isLoadingInput, setIsLoadingInput] = useState(true)
      const searchParams = useSearchParams();
    const book_uuid = searchParams.get("book_uuid");
     const [bookID, setBookID] = useState<string>("")
      const [bookTitle, setBookTitle] = useState<string>("")


    const { data: bookData } = useOne<EditBookData>({
        resource: "book_v2/get_book_title_details",
        id: `_book_uuid=${book_uuid}` || ""
    });

    const {
        register,
        setValue,
        formState: { errors }
    } = useForm<EditBookData>();


    useEffect(() => {
        if (Array.isArray(bookData?.data) && bookData.data.length > 0) {
          const book = bookData.data[0];
          setBookID(book.book_title_id)
          setBookTitle(book.book_title);
          Object.keys(book).forEach((key) => {
            let value = book[key as keyof EditBookData];
            if (key === "year_of_publication" || key === "updated_at" || key === "created_at") {
              value = value ? new Date(value).toISOString().split("T")[0] : "";
            }
            setValue(key as keyof EditBookData, value as never);
          });
          setIsLoadingInput(false);
        }
      }, [bookData, setValue]);
    return (
        <>
            {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-4"> */}

            <div>
                <h2>Cataloging</h2>
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
                        loading={isLoadingInput}
                        readonly={true}
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
                        loading={isLoadingInput}
                        readonly={true}

                    />

                    <InputField
                        label="Name of Publisher"
                        name="name_of_publisher"
                        register={register}
                        errors={errors}
                        type="text"
                        validation={{
                            required: "SName of Publisher is required",
                        }}
                        placeholder="Enter Name of Publisher"
                        loading={isLoadingInput}
                        readonly={true}

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
                        loading={isLoadingInput}
                        readonly={true}

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
                        loading={isLoadingInput}
                        readonly={true}

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
                        loading={isLoadingInput}
                        readonly={true}

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
                        loading={isLoadingInput}
                        readonly={true}

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
                        loading={isLoadingInput}
                        readonly={true}

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
                        loading={isLoadingInput}
                        readonly={true}

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
                        loading={isLoadingInput}
                        readonly={true}

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
                        loading={isLoadingInput}
                        readonly={true}

                    />
                </div>

                <h2>Classification</h2>
                <div className="grid grid-cols-4 gap-4 p-4">
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
                        loading={isLoadingInput}
                        readonly={true}

                    />

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
                        loading={isLoadingInput}
                        readonly={true}

                    />

                </div>
            </div>

            {/* </form> */}
        </>
    )
}

export default BookTitleDetails