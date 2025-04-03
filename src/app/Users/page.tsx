'use client';

import React, { Suspense, useState } from 'react';

import Header from '@/app/Header/header';
import MasterTable from '@/app/test/table-page';
import { getUserColumns } from './columns';



const AllUsers = () => {

  const [url, setUrl] = useState("all-users")

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <Header heading="Users Details" subheading="Tanvir Chavan" />


        <section>
          <div className="mx-[40px]">
            
            <MasterTable
            title='Users'
            columns={getUserColumns}
            resource={`users/${url}`}
            isSelectable={false}
            AddedOptions={[]}
            />
          </div>
        </section>
      </>
    </Suspense>
  );
};

export default AllUsers;