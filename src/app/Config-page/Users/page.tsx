'use client';

import React, { Suspense } from 'react';

import MasterTable from '@/app/test/table-page';
import { getActonsColumns, getUserColumns } from './columns';
import AddUserButton from '@/components/user/add-user-button';

const AllUsers = () => {

  const url = "all"

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <section>
          <div>
            <MasterTable
            title='Users'
            columns={getUserColumns}
            resource={`user/${url}`}
            isSelectable={false}
            AddedOptions={[AddUserButton]}
            priorColumns={getActonsColumns}
            />
          </div>
        </section>
      </>
    </Suspense>
  );
};

export default AllUsers;