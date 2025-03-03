'use client';

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import Search from '../../images/search.png'
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from "next/navigation";

interface Attendence {
  student_uuid: string,
  student_id: string,
  student_name: string,
  student_intime: string,
  student_outtime: string
}

const attendanceLogs: Attendence[] = [];
for (let i = 1; i <= 30; i++) {
  attendanceLogs.push({
    student_uuid: `stu-uuid-${i}`,
    student_id: `stu-${i.toString().padStart(3, '0')}`,
    student_name: `Student ${i}`,
    student_intime: `08:${(Math.floor(Math.random() * 60)).toString().padStart(2, '0')}`, // Random time from 08:00 to 08:59
    student_outtime: `16:${(Math.floor(Math.random() * 60)).toString().padStart(2, '0')}` // Random time from 16:00 to 16:59
  });
}


const AttendenceLog = () => {


  const router = useRouter()

  // const { data, isLoading } = useList<BookLog>({ resource: 'all' });
  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(attendanceLogs.length / ITEMS_PER_PAGE);

  const paginatedLogs = attendanceLogs.slice(
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
              <p className='bg-[#F9F5FF] rounded-2xl text-[#6941C6]'>{attendanceLogs.length}<span> Enteries</span></p>
            </div>
            <div className="flex items-center justify-end py-4 gap-3">
              {/* Activities Button */}
              <Button onClick={() => router.push('/book-activities')} className='bg-[#1E40AF] text-white rounded-[8px] p-4 hover:bg-[#1E40AF] hover:text-white'>
                Book Activities
              </Button>
              {/* Search Input with Icon */}
              <div className="relative max-w-sm w-72">
                <Image src={Search} alt='search-icon' className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
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
                  <span className="font-bold">{item.student_id}</span> | {item.student_name} |{' '}
                  {item.student_intime} | {item.student_outtime}
                </p>

              </div>
            ))}
          </div>
        </div>
        {/* Pagination Controls */}
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

export default AttendenceLog