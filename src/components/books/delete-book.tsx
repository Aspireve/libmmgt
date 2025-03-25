import React from "react";
import { Button } from "../ui/button";
import useDisclosure from "@/hooks/disclosure-hook";
import DeleteBookModal from "./delete-book-modal";
import { BookData } from "@/app/book-pages/types/data";

const DeleteBook = <TData extends BookData>({
  data,
  refetch,
}: {
  data: TData[];
  refetch: () => void;
}) => {
  const { isOpen, open, close } = useDisclosure();

  return (
    data &&
    data?.length > 0 && (
      <>
        <Button
          className="bg-red-600 text-white hover:bg-red-900 rounded-[10px]"
          onClick={open}
        >
          {data?.length === 1 ? "Delete" : "Delete All"}
        </Button>
        <DeleteBookModal
          data={data}
          close={close}
          isOpen={isOpen}
          refetch={refetch}
        />
      </>
    )
  );
};

export default DeleteBook;
