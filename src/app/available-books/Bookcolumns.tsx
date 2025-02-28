"use client";

import { ColumnDef } from "@tanstack/react-table";
import EditBtn from "../../images/EditBtn.png"
import DeleteBtn from "../../images/deleteBtn.png"

// 1. Define the Book interface
export interface Book {
  id: string;
  srNo: number;
  nameOfBook: string;
  nameOfAuthor: string;
  publisher: string;
  bookCount: number;
  yearOfPublication: number;
}

// 2. Example fallback data
export const fallbackData: Book[] = [
  {
    id: "1",
    srNo: 1,
    nameOfBook: "The Art of Learning",
    nameOfAuthor: "Josh Waitzkin",
    publisher: "Free Press",
    bookCount: 6,
    yearOfPublication: 2007,
  },
  {
    id: "2",
    srNo: 2,
    nameOfBook: "Atomic Habits",
    nameOfAuthor: "James Clear",
    publisher: "Penguin",
    bookCount: 6,
    yearOfPublication: 2018,
  },
  {
    id: "3",
    srNo: 3,
    nameOfBook: "Sapiens: A Brief History of Humankind",
    nameOfAuthor: "Yuval Noah Harari",
    publisher: "Harper",
    bookCount: 6,
    yearOfPublication: 2014,
  },
  {
    id: "4",
    srNo: 4,
    nameOfBook: "Thinking, Fast and Slow",
    nameOfAuthor: "Daniel Kahneman",
    publisher: "Farrar, Straus and Giroux",
    bookCount: 6,
    yearOfPublication: 2011,
  },
  {
    id: "5",
    srNo: 5,
    nameOfBook: "Deep Work",
    nameOfAuthor: "Cal Newport",
    publisher: "Grand Central Publishing",
    bookCount: 6,
    yearOfPublication: 2016,
  },
];

// 3. Define columns for your DataTable
export const Bookcolumns: ColumnDef<Book>[] = [
  {
    accessorKey: "srNo",
    header: "Sr no",
  },
  {
    accessorKey: "nameOfBook",
    header: "Name of Book",
  },
  {
    accessorKey: "nameOfAuthor",
    header: "Name of Author",
  },
  {
    accessorKey: "publisher",
    header: "Publisher",
  },
  {
    accessorKey: "bookCount",
    header: "Book Count",
  },
  {
    accessorKey: "yearOfPublication",
    header: "Year of Publication",
  },
  {
    
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const book = row.original;
      return (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDelete(book.id)}
          >
            <img src={DeleteBtn.src} alt="Delete" />
          </button>
          <button
            onClick={() => handleEdit(book)}
          >
            <img src={EditBtn.src} alt="Edit" />
          </button>
        </div>
      );
    },
  },
];


const handleEdit = (book: Book) => {
  console.log(alert(`Edit book with ID: ${book.id}`));
};

const handleDelete = (id: string) => {
  console.log((`Delete book with ID: ${id}`));
};
