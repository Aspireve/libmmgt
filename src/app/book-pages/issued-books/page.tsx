'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { Issuedbooks, columns, issuedBooksData } from './columns';
import { DataTable } from '@/components/data-tables/data-table';
import { useList } from '@refinedev/core';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { bookRoutes } from "../types/data";
import {images} from "../images"
import Header from '@/app/Header/header';
import Tabbing from '@/app/Tab/Tab';

const IssuedBooks = () => {
  // const { data, isLoading } = useList<Issuedbooks>({ resource: 'view-books' });
   const [data, setData] = useState<Issuedbooks[]>([]);
      const router = useRouter();
    
      useEffect(() => {
        setTimeout(() => {
          setData(issuedBooksData);
        }, 1000);
      }, []);

  return (
    <>
    <Header/>
    <Tabbing routes={bookRoutes} className="w-[30%]"/>


    <section className="border border-[#E0E2E7] rounded-[10px] m-4">

<div className='container'>
  <div className="grid grid-cols-[30%_70%] p-4">
    <div className='flex items-center gap-[10px]'>
      <h1 className=' text-3xl font-bold'>Books</h1>
      <p className='bg-[#F9F5FF] rounded-2xl text-[#6941C6]'>{data.length}<span> Enteries</span></p>
    </div>
    <div className="flex items-center justify-end py-4 gap-3">
      {/* Issue Book */}
      <Button
        onClick={() => router.push("/issue-books")}
        className="shadow-none border border-[#989CA4] rounded-[8px] text-[#BBBBBB] flex items-center px-4 py-2">
        {/* <Image src={Addbook} alt="Add button" /> */}
        Issue Books
      </Button>


      {/* Search Input with Icon */}
      <div className="relative max-w-sm w-72">
        <Image src={images.search} alt='search-icon' className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search"
          className="pl-10 rounded-[8px] border border-[#D5D7DA] text-[#BBBBBB]"
        />
      </div>

      {/* Search Button */}
      <Button className='bg-[#1E40AF] text-white rounded-[8px] w-[10%] p-4 hover:bg-[#1E40AF] hover:text-white'>
        Search
      </Button>
    </div>
  </div>

    {/* <DataTable columns={columns} data={data?.data || []} /> */}
    <DataTable columns={columns} data={data} />

</div>
</section>
    </>
  );
};

export default IssuedBooks;