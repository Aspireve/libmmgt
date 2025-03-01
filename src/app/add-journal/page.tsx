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
import { routes } from '../add-book/page';
import { toast } from 'sonner';
import { General_info,Subscription_deatils,Volume,Publication,Library_info } from './data'

const AddJournal = () => {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { mutate } = useCreate();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    mutate(
      { resource: "add-book", values: data },
      {
        onSuccess: () => {
          toast.success("Journal added successfully!", { position: 'top-left' })
          router.push("/all-books")
        },
        onError: (error) => toast.error("Error adding Journal: " + error.message),
      }
    );
  };

  return (
    <>
      <Header />
      <Tabbing routes={routes} className='w-[30%]' />
      <section className='p-10'>
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* General_info */}
            <div>
              <h2>General Information</h2>
              <div className="grid grid-cols-4 gap-4 p-4">
                {General_info.map((field) => (
                  <div key={field.name}>
                    <Label>{field.label}</Label>
                    <Input
                      {...register(field.name, { required: field.required })}
                      placeholder={field.placeholder}
                    />
                    {errors[field.name] && <p className="text-red-500 text-sm">{[field.required]}</p>}
                  </div>
                ))}
              </div>
            </div>
            {/* Subscription_deatils */}
            <div>
              <h2>Subscription deatils</h2>
              <div className='grid grid-cols-4 gap-4 p-4'>
                {Subscription_deatils.map((field) => (
                  <div key={field.name}>
                    <Label>{field.label}</Label>
                    <Input
                      {...register(field.name, { required: field.required })}
                      placeholder={field.placeholder}
                    />
                    {errors[field.name] && <p className="text-red-500 text-sm">{[field.required]}</p>}

                  </div>
                ))}
              </div>
            </div>
            {/* Volume */}
            <div>
              <h2>Volume</h2>

              <div className='grid grid-cols-4 gap-4 p-4'>
                {Volume.map((field) => (
                  <div key={field.name}>
                    <Label>{field.label}</Label>
                    <Input
                      {...register(field.name, { required: field.required })}
                      placeholder={field.placeholder}
                    />
                    {errors[field.name] && <p className="text-red-500 text-sm">{[field.required]}</p>}

                  </div>
                ))}
              </div>
            </div>
            {/* Publication */}
            <div>
              <h2>Inventory and Identification</h2>
              <div className='grid grid-cols-4 gap-4 p-4'>
                {Publication.map((field) => (
                  <div key={field.name}>
                    <Label>{field.label}</Label>
                    <Input
                      {...register(field.name, { required: field.required })}
                      placeholder={field.placeholder}
                    />
                    {errors[field.name] && <p className="text-red-500 text-sm">{[field.required]}</p>}

                  </div>
                ))}
              </div>
            </div>
            {/* Library_info */}
            <div>
              <h2>Library Information</h2>
              <div className='grid grid-cols-4 gap-4 p-4'>
                {Library_info.map((field) => (
                  <div key={field.name}>
                    <Label>{field.label}</Label>
                    <Input
                      {...register(field.name, { required: field.required })}
                      placeholder={field.placeholder}
                    />
                    {errors[field.name] && <p className="text-red-500 text-sm">{[field.required]}</p>}

                  </div>
                ))}
              </div>
            </div>
            <div className='flex justify-center gap-6'>
              <Button type='button' onClick={() => router.push("/all-books")}>Cancel</Button>
              <Button type='submit' className='shadow-none border border-[#1E40AF] text-white bg-[#1E40AF] rounded-[10px] hover:bg-[#1E40AF]'>Add Journal</Button>
            </div>
          </form>

        </div>
      </section>
    </>
  )
}

export default AddJournal