'use client';

import React, { Suspense } from 'react';

import MasterTable from '@/app/test/table-page';
import { getUserColumns } from './columns';
import AddUserButton from '@/components/user/add-user-button';

const AllUsers = () => {

  const url = "all-users"

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <section>
          <div className="mx-[40px]">
            <MasterTable
            title='Users'
            columns={getUserColumns}
            resource={`users/${url}`}
            isSelectable={false}
            AddedOptions={[AddUserButton]}
            />
          </div>
        </section>
      </>
    </Suspense>
  );
};

export default AllUsers;