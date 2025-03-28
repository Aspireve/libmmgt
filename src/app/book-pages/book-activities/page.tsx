'use client';

import ActivityLog from '@/components/dashboard/activity-log';
import { ActivityType } from '@/types/book';
import { useList } from '@refinedev/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { Pagination } from '@/app/test/pagination';
import Header from '@/components/custom/header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import images from '@/images';

//TODO: STYLING and PAGINATION
const BookActivities = ({ refresh }: { refresh: number }) => {
  const dispatch = useDispatch();
  const { page, limit } = useSelector((state: RootState) => state.pagination);
  
  const { data, isLoading, refetch } = useList({
    resource: 'book_v2/get_all_logs',
    config: {
      pagination: { pageSize: limit, current: page },
    },
  });
  
  useEffect(() => {
    refetch();
  }, [refresh, page, limit]);
  const activityLogs = Array.isArray(data?.data) ? data.data : [];

  return (
    <>
    <Header heading='Activites' subheading='Tanvir Chavan'/>
    <section className='mx-4 mt-10 '>
      <div>
        <div>
          <div className='flex justify-end gap-3 pr-6'>
          <Button
            className='border border-[#1E40AF] text-[#1E40AF] rounded-[6px]'
            >Export</Button>
            <Button
            className='border border-[#1E40AF] text-[#1E40AF] rounded-[6px]'
            >Filter</Button>
            <div className='flex gap-4 relative'>
            <Image src={images.Search} alt='search-icon'  className='absolute top-1/2 transform -translate-y-1/2 w-4 h-4 ml-2'/>
            <Input className='pl-7 rounded-[6px]' type='text' placeholder='search'/>
          </div>
          </div>
        </div>
        <div className="my-2 p-6">
        {isLoading && <ActivityLog isLoading={true} />}
        {activityLogs.map((item, idx) => (
          <ActivityLog
            key={`activity-${idx}`}
            type={item?.action as ActivityType}
            book_id={item?.new_book_copy?.book_copy_id || 'Unknown Title'}
            title={item?.new_book_title?.book_title || 'Unknown Title'}
            studentName={item?.student_name || 'Unknown Student'}
            time={item?.created_at || 'Unknown Time'}
            isLoading={isLoading}
          />
        ))}

        {/* Pagination Component */}
        <Pagination isLoading={isLoading} />
      </div>
      </div>
    </section>
    </>
    
  );
};

export default BookActivities;
