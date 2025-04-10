import { ColumnDef } from "@tanstack/react-table";
import { BookData } from "../types/data";
import { useRouter } from "next/navigation";
import { formatDate } from "../hooks/formatDate";
import { HugeiconsIcon } from "@hugeicons/react";
import { Edit02Icon } from "@hugeicons/core-free-icons";
import TooltipToggle from "@/components/custom/tooltip-toggle";

interface BookTitleCellProps {
  book: BookData;
}

const BookTitleCell: React.FC<BookTitleCellProps> = ({ book }) => {
  const router = useRouter();

  return (
    <div
      className="relative group cursor-pointer font-bold text-[#1E40AF]"
      onClick={() =>
        router.push(`/book-pages/book-details?book_uuid=${book.book_uuid}`)
      }
    >
      {book.book_title_id}
    </div>
  );
};

interface ActionsCellProps {
  book: BookData;
  handleEdit: (book: BookData) => void;
}

const ActionsCell: React.FC<ActionsCellProps> = ({ book, handleEdit }) => (
  <TooltipToggle content="Edit Book">
    <div className="flex gap-2 cursor-pointer">
      <HugeiconsIcon
        icon={Edit02Icon}
        color="#1E40AF"
        size={20}
        onClick={() => handleEdit(book)}
      />
    </div>
  </TooltipToggle>
);

export const getBookColumns = (
  handleEdit: (book: BookData) => void
): ColumnDef<BookData>[] => {
  return [
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <ActionsCell book={row.original} handleEdit={handleEdit} />
      ),
    },
    {
      accessorKey: "book_title_id",
      header: "ID",
      cell: ({ row }) => <BookTitleCell book={row.original} />,
    },

    {
      accessorKey: "book_title",
      header: "Name",
    },
    { accessorKey: "book_author", header: "Book Author" },
    { accessorKey: "name_of_publisher", header: "Book Publisher" },
    { accessorKey: "available_count", header: "Book Count" },
    { accessorKey: "isbn", header: "ISBN" },
    {
      accessorKey: "year_of_publication",
      header: "Year of Publication",
      cell: ({ row }) => (
        <span>{formatDate(row.original.year_of_publication)}</span>
      ),
    },
  ];
};
