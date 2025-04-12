import { ColumnDef } from "@tanstack/react-table";
import { BookDetails } from "../types/data";
import { useRouter } from "next/navigation";
import { formatDate } from "../hooks/formatDate";
import { HugeiconsIcon } from "@hugeicons/react";
import { Edit02Icon } from "@hugeicons/core-free-icons";
import TooltipToggle from "@/components/custom/tooltip-toggle";

interface BookTitleCellProps {
  book: BookDetails;
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
      {book.book_item_id}
    </div>
  );
};

interface PeriodicalTitleCellProps {
  periodical: BookDetails;
}
const JournalTitleCell: React.FC<PeriodicalTitleCellProps> = ({
  periodical,
}) => {
  const router = useRouter();

  return (
    <div
      className="relative group cursor-pointer font-bold text-[#1E40AF]"
      onClick={() =>
        router.push(
          `/periodicals-pages/periodical-details?journal_title_id=${periodical.item_id}`
        )
      }
    >
      {periodical.item_id}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs rounded-lg px-3 py-1 shadow-md whitespace-nowrap
        after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-800"
      >
        Journal Details
      </div>
    </div>
  );
};
interface ActionsCellProps {
  book: BookDetails;
  handleEdit: (book: BookDetails) => void;
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
  handleEdit: (book: BookDetails) => void
): ColumnDef<BookDetails>[] => {
  return [
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <ActionsCell book={row.original} handleEdit={handleEdit} />
      ),
    },
    {
      accessorKey: "bookTitleId",
      header: "ID",
      cell: ({ row }) => {
        const itemId = row.original.bookTitleId;
        const book = {
          ...row.original,
          item_id: itemId,
          book_item_id: itemId,
        };
        if (itemId) {
          return <JournalTitleCell periodical={book} />;
        } else {
          return <BookTitleCell book={book} />;
        }
        // const itemId = row.original.item_id ?? row.original.book_item_id;
        // const book = {
        //   ...row.original,
        //   item_id: itemId,
        //   book_item_id: itemId,
        // };
        // if (itemId) {
        //   return <JournalTitleCell periodical={book} />;
        // } else {
        //   return <BookTitleCell book={book} />;
        // }
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.original.categoryName;

        const categoryMap = {
          null: { label: "Book", color: "green" },
          journal: { label: "Journal", color: "purple" },
          magazine: { label: "Magazine", color: "purple" },
        };

        const { label, color } =
          categoryMap[category as keyof typeof categoryMap] || categoryMap.null;

        return (
          <span
            className={`flex justify-center bg-${color}-100 text-${color}-700 border-${color}-200 font-sans px-2 py-1 rounded-[20px]`}
          >
            {label}
          </span>
        );
      },
    },
    {
      accessorKey: "bookTitle",
      header: "Name",
      cell: ({ row }) => {
        const book_title = row.original.bookTitle;
        return <span>{book_title ? book_title : "-"}</span>;
      },
    },
    {
      accessorKey: "author1",
      header: "Author",
      cell: ({ row }) => {
        const book_author = row.original.author1;
        return (
          <span className="text-center">{book_author ? book_author : "-"}</span>
        );
      },
    },
    { accessorKey: "publisher", header: "Publisher" },
    {
      accessorKey: "isbn",
      header: "ISBN",
      cell: ({ row }) => {
        const isbn = row.original.isbn;
        return <span>{isbn ? isbn : "-"}</span>;
      },
    },
    {
      accessorKey: "yearOfPublication",
      header: "Year of Publication",
      cell: ({ row }) => {
        const date = row.original.yearOfPublication;
        return <span>{date ? new Date(date).getFullYear() : "-"}</span>;
      },
    },
    { accessorKey: "availableCount", header: "Available Count" },

    {
      accessorKey: "totalCount",
      header: "Total Number",
      cell: ({ row }) => {
        const Volume_No = row.original.totalCount;
        return <span>{Volume_No ? Volume_No : "-"}</span>;
      },
    },
    // {
    //   accessorKey: "frequency",
    //   header: "Frequency",
    //   cell: ({ row }) => {
    //     const Frequency = row.original.frequency;
    //     return <span>{Frequency ? Frequency : "-"}</span>;
    //   },
    // },
  ];
};
