'use client';

import React, { useState } from 'react';
import { BookData } from '../types/data';

import { useRouter } from "next/navigation";
import { getBookColumns } from './columns';
import MasterTable from '@/app/test/table-page';

import ImportBookButton from '@/components/books/import-books-button';
import AddBookButton from '@/components/books/add-book-button';
import { bookRoutes } from '../types/routes';
import { SearchFilter } from "@/components/students/search-student";
import Tabbing from '@/components/custom/tabbing';
import PeriodicalPage from '@/app/periodicals-pages/periodicals-page/page';
import Header from '@/components/custom/header';

enum LibraryTabs {
  ALLBOOKS = "All Books",
  PERIODICALS = "Periodicals",
}

const TABS = [
  { key: LibraryTabs.ALLBOOKS, label: "All Books" },
  { key: LibraryTabs.PERIODICALS, label: "Periodicals" },
];

const BooksPage = () => {
  const [url, setUrl] = useState("all")
  const [activeTab, setActiveTab] = useState<LibraryTabs>(LibraryTabs.ALLBOOKS);

  const router = useRouter();

  const handleEdit = (book: BookData) => {
    router.push(`/book-pages/edit-book?book_uuid=${book.book_uuid}`);
  };
  const columns = getBookColumns(handleEdit);


  return (
    <>
      <Header 
      heading={activeTab === LibraryTabs.PERIODICALS ? "Periodicals" : "Book List"} 
      subheading="Tanvir Chavan" />
      <section>
        
        <div className="mx-[40px]">
          <Tabbing
            tabs={TABS}
            activeTab={activeTab} 
            onTabChange={setActiveTab}
            content={{
              [LibraryTabs.ALLBOOKS]:
                <>
                  <MasterTable
                    title='Books'
                    columns={() => columns}
                    resource={`book_v2/${url}`}
                    AddedOptions={[
                      AddBookButton,
                      ImportBookButton,
                      ({ setFilters }) =>
                        SearchFilter({
                          setFilters,
                          options: [
                            { label: "Book Id", value: "book_title_id" },
                            { label: "Name", value: "book_title_name" },
                          ],
                          placeholder: "Search",
                        }), // Pass the setFilters function to SearchFilter,
                    ]}

                    isSelectable={false}

                  />
                </>,
              [LibraryTabs.PERIODICALS]: 
              <>
                <PeriodicalPage/>
              </>,
            }}
          />
        </div>

      </section>
    </>
  );
};

export default BooksPage;