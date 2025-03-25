// "use client";

// import React, { Suspense, useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useForm } from "@refinedev/react-hook-form";
// import { useOne } from "@refinedev/core";
// import { Button } from "@/components/ui/button";
// import { toast } from 'sonner';
// import Header from "@/app/Header/header";
// import { dataProvider } from "@/providers/data";
// import { InputField } from "@/components/custom/inputfield";
// import { Loader2 } from "lucide-react";
// import { JournalData } from "../types/data";

// const EditBook = () => {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const book_uuid = searchParams.get("book_copy_uuid");
//     const [isLoading, setIsLoading] = useState(false)
    

//     const { data: JournalData, isLoading:LoadingDetails } = useOne<JournalData>({
//         resource: "book_v2/get_book_copy",
//         id: `_identifier=${book_uuid}` || ""
//     });
//     const JournalTitle = "Edit Book"
//     const JournalID = JournalData?.data?.journal?.journal_copy_id;


//     const {
//         register,
//         handleSubmit,
//         setValue,
//         formState: { errors }
//     } = useForm<JournalData>();


//     const UpdateFields = () => {
//         const book = JournalData?.data?.journal;
//         if (!book) {
//             console.warn("No book data available");
//             return;
//         }
//         Object.keys(book).forEach((key) => {
//             let value = book[key as keyof JournalData];
//             if (key === "date_of_acquisition") {
//                 value = value ? new Date(value).toISOString().split("T")[0] : "";
//             }
//             setValue(key as keyof JournalData, value as never);
//         });
//     };

//     useEffect(() => {
//         UpdateFields();
//     }, [JournalData, setValue]);

//     const onSubmit = async (data: any) => {
//         setIsLoading(true)
//         const formatDate = (dateString: string | undefined) => {
//             if (!dateString) return null;
//             const date = new Date(dateString);
//             return isNaN(date.getTime()) ? null : date.toISOString().split("T")[0];
//         };
//         const formattedData: JournalData = {
//             ...data,
//         };
//         try {
//                 await dataProvider.patchUpdate({
//                 resource: 'book_v2/update_book_copy',
//                 value: formattedData,
//             })
//             toast.success("Book title updated successfully!");
//             window.history.back();
//         } catch (error: any) {
//             toast.error(error.message);
//         }
//     };

//     return (
//         <Suspense fallback={<div>Loading...</div>}>
//             <>
//                 {/* <Header heading={BookTitle} subheading={BookID} /> */}
//                 <section className="p-10">
//                     <div className="container">
//                         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                             <div>
//                                 <h2>Cataloging</h2>
//                                 <div className="grid grid-cols-4 gap-4 p-4">
//                                 </div>
//                             </div>


//                             {/* Action Buttons */}
//                             <div className="flex justify-center gap-4">
//                                 <Button
//                                 type="button"
//                                 className="shadow-none text-[#1E40AF] rounded-[10px]"
//                                 onClick={() => window.history.back()}>
//                                 Cancel
//                                 </Button>

//                                 <Button
//                                     type="submit"
//                                     className="bg-[#1E40AF] text-white rounded-[10px] hover:bg-[#1E40AF]"
//                                     disabled={isLoading}
//                                 >
//                                     {isLoading ? (
//                                         <>
//                                             Updating Journal...
//                                             <Loader2 className="h-5 w-5 animate-spin" />
//                                         </>
//                                     ) : (
//                                         "Update Journal"
//                                     )}
//                                 </Button>
//                             </div>
//                         </form>
//                     </div>
//                 </section>
//             </></Suspense>
//     );
// };

// export default EditBook;
