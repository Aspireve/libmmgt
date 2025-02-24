'use client';
import { Issuedbooks, columns } from './columns';
import { DataTable } from '@/components/data-tables/data-table';
import React from 'react';
import { useList } from '@refinedev/core';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Addbook from '../../images/addbook.png'
import Search from '../../images/search.png'
import Image from 'next/image';
import Tabbing from '../Tab/Tab';

const IssuedBooks = () => {
  const { data, isLoading } = useList<Issuedbooks>({ resource: 'view-books' });

  return (
    <>
      <section className="border border-[#E0E2E7] rounded-[10px]">
      <Tabbing/>

        <div className='container'>
          <div className="grid grid-cols-2 p-4">
            <div className='flex items-center gap-[10px]'>
              <h1 className=' text-3xl font-bold'>Books</h1>
              <p className='bg-[#F9F5FF] rounded-2xl text-[#6941C6]'>100 <span>Enteries</span></p>
            </div>
            <div className="flex items-center justify-between py-4">
      {/* Add Books Button */}
      <Button className="shadow-none border border-[#D5D7DA] rounded-[8px] text-[#BBBBBB] flex items-center px-4 py-2">
        <Image src={Addbook} alt="Add button" className="mr-2" width={20} height={20} />
        Add Books
      </Button>

      {/* Search Input with Icon */}
      <div className="relative max-w-sm w-72">
        <Image src={Search} alt='search-icon' className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search"
          className="w-full pl-10 rounded-[8px] border border-[#D5D7DA] text-[#BBBBBB]"
        />
      </div>

      {/* Search Button */}
      <Button className='bg-[#1E40AF] text-white rounded-[8px] w-[15%] p-4 hover:bg-[#1E40AF] hover:text-white'>
        Search
      </Button>
    </div>
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <DataTable columns={columns} data={data?.data || []} />
          )}
        </div>
      </section>
    </>
  );
};

export default IssuedBooks;