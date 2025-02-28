  "use client";

  import React from 'react'
  import Header from '../Header/header'
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Label } from '@/components/ui/label';
  import { useForm } from "@refinedev/react-hook-form";
  import { useCreate } from '@refinedev/core';
  import { useRouter } from 'next/navigation';
  import Tabbing from '../Tab/Tab';
  import { bibliographic,cataloging,acquisition,inventory} from './data'
import { toast } from 'sonner';

  export const routes = [
      { key: "add-book", label: "Add Book", path: "/add-book" },
      { key: "add-journal", label: "Add journal/Magzine", path: "/add-journal" }, 
  ]


  interface BookData {
    book_id:string;
    book_title: string;
    book_author: string;
    name_of_publisher: string;
    place_of_publication: string;
    year_of_publication: string;
    language: string;
    edition: string;
    isbn: string;
    no_of_pages: number;
    no_of_preliminary_pages: number;
    subject: string;
    department: string;
    call_number: string;
    author_mark: string;
    source_of_acquisition?: string;
    date_of_acquisition?: string;
    inventory_number: number;
    accession_number: number;
    barcode?: string;
    item_type?: string;
    bill_no: number;
    institute_id:string;
  }


  const AddBook = () => {
    const router = useRouter();

    const {
      register,
      handleSubmit,
      formState:{errors}
    } = useForm();

    const { mutate } = useCreate();

    const onSubmit = (data: any) => {
      
      const formatDate = (dateString: string | undefined) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? null : date.toISOString().split("T")[0];
      };
      const formattedData: BookData = {
        
        ...data,
        no_of_pages: parseInt(data.no_of_pages.toString(), 10),
        no_of_preliminary_pages: parseInt(data.no_of_preliminary_pages.toString(), 10),
        inventory_number: parseInt(data.inventory_number.toString(), 10),
        accession_number: parseInt(data.accession_number.toString(), 10),
        bill_no: parseInt(data.bill_no.toString(), 10),
        year_of_publication: formatDate(data.year_of_publication),
        date_of_acquisition: formatDate(data.date_of_acquisition),
        institute_id: "828f0d33-258f-4a92-a235-9c1b30d8882b"
      };

      mutate(
        { resource: "create", values: formattedData }, 
        {
          onSuccess: () => {
            toast.success("Book added successfully!",{
              position:'top-left'
            })
            router.push("/all-books")
          },
          onError: (error) => alert("Error adding book: " + error.message),
        }
      );
    };

   

    return (
      <>
      <Header/>
      <Tabbing routes={routes} className='w-[30%]'/>
        <section className='p-10'>
          <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              {/* Bibliographic_info */}
              <div>
                <h2>Bibliographic Information</h2>
                <div className="grid grid-cols-4 gap-4 p-4">
                  {bibliographic.map((field) => (
                    <div key={field.name}>
                      <Label>{field.label}</Label>
                      <Input
                      type={field.type}
                        {...register(field.name, { required: field.required })}
                        placeholder={field.placeholder}
                      />
                       {errors[field.name] && <p className="text-red-500 text-sm">{typeof errors[field.name]}</p>}
                
                    </div>
                  ))}
                </div>
              </div>
              {/* Cateloging */}
              <div>
                <h2>Cateloging and Classification</h2>
                <div className='grid grid-cols-4 gap-4 p-4'>
                  {cataloging.map((field) => (
                    <div key={field.name}>
                      <Label>{field.label}</Label>
                      <Input
                      type={field.type}
                        {...register(field.name, { required: field.required })}
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Acquisition */}
              <div>
                <h2>Acquisition Details</h2>

                <div className='grid grid-cols-4 gap-4 p-4'>
                  {acquisition.map((field) => (
                    <div key={field.name}>
                      <Label>{field.label}</Label>
                      <Input
                      type={field.type}
                        {...register(field.name, { required: field.required })}
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Inventory */}
              <div>
                <h2>Inventory and Identification</h2>
                <div className='grid grid-cols-4 gap-4 p-4'>
                  {inventory.map((field) => (
                    <div key={field.name}>
                      <Label>{field.label}</Label>
                      <Input
                      type={field.type}
                        {...register(field.name, { required: field.required })}
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex justify-center'>
                <Button onClick={() => router.push("/all-books")}>Cancel</Button>
                <Button type='submit' className='shadow-none border border-[#1E40AF] text-white bg-[#1E40AF] rounded-[10px] hover:bg-[#1E40AF]'>Add Book</Button>
              </div>
            </form>
          </div>
        </section>
      </>
    )
  }

  export default AddBook



