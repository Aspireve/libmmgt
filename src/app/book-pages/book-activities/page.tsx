'use client';

import { Button } from '@/components/ui/button'
import { useList } from '@refinedev/core';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { FileText } from "lucide-react";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import images from '@/images';

interface BookLog {
  booklog_id: string,
  book_uuid: string,
  book_title: string,
  student_id: string,
  date: string,
  department: string,
  student_name: string,
  book_status: string,
}
const bookLogs: BookLog[] = [
  {
    booklog_id: "log1",
    book_uuid: "book-uuid-1",
    book_title: "Random book 1",
    student_id: "stu-001",
    date: "2024-02-25",
    department: "Computer Science",
    student_name: "John Doe",
    book_status: "Borrowed",
  }
];
for (let i = 2; i <= 30; i++) {
  bookLogs.push({
    booklog_id: `log${i}`,
    book_uuid: `book-uuid-${i}`,
    book_title: `Random Book ${i}`,
    student_id: `stu-${i.toString().padStart(3, "0")}`,
    date: `2024-02-${(Math.floor(Math.random() * 28) + 1).toString().padStart(2, "0")}`,
    department: ["Computer Science", "Software Engineering", "AI", "IT", "Mathematics"][
      Math.floor(Math.random() * 5)
    ],
    student_name: `Student ${i}`,
    book_status: ["Borrowed", "Returned", "Overdue"][Math.floor(Math.random() * 3)],
  });
}
const BookActivities = () => {
  const router = useRouter()

  // const { data, isLoading } = useList<BookLog>({ resource: 'all' });
  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(bookLogs.length / ITEMS_PER_PAGE);

  const paginatedLogs = bookLogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <section className="border border-[#E0E2E7] rounded-[10px] m-4">

        <div className='container'>
          <div className="grid grid-cols-[30%_70%] p-4">
            <div className='flex items-center gap-[10px]'>
              <h1 className=' text-3xl font-bold'>Books Activities</h1>
              <p className='bg-[#F9F5FF] rounded-2xl text-[#6941C6]'>{bookLogs.length}<span> Enteries</span></p>
            </div>
            <div className="flex items-center justify-end py-4 gap-3">
              {/* Search Button */}
              <Button onClick={() => router.push('/attendence-log')} className='bg-[#1E40AF] text-white rounded-[8px] w-[10%] p-4 hover:bg-[#1E40AF] hover:text-white'>
                Attendence
              </Button>
              {/* Search Input with Icon */}
              <div className="relative max-w-sm w-72">
                <Image src={images.Search} alt='search-icon' className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
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
          {/* {isLoading ? (
            <p>Loading...</p>
          ) : (
            
          )} */}
          <div className="space-y-3 rounded-[5px] p-4">
            {paginatedLogs.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 p-3 rounded-[5px] border border-gray-200 bg-white"
              >
                <p className="text-sm text-black">
                  <span className="font-bold">{item.student_name} | {item.book_title}</span> |{' '}
                  {item.date}
                </p>
                <p className="text-right">{item.book_status}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center gap-4 my-4">
          <Button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2">
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2">
            Next
          </Button>
        </div>

      </section>
    </>
  )
}

export default BookActivities