"use client";

import { ColumnDef } from "@tanstack/react-table";

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  available: boolean;
}

export const Bookcolumns: ColumnDef<Book>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "available",
    header: "Available",
    cell: ({ getValue }) => (getValue<boolean>() ? "Yes" : "No"),
  },
];

export const fallbackData: Book[] = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", available: true },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", available: false },
  { id: 3, title: "1984", author: "George Orwell", genre: "Dystopian", available: true },
  { id: 4, title: "Moby-Dick", author: "Herman Melville", genre: "Adventure", available: false },
  { id: 5, title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", available: true },
];
