import React from "react";
import { Button } from "../ui/button";
import useDisclosure from "@/hooks/disclosure-hook";
import DeleteBookModal from "./delete-book-modal";
import { BookData } from "@/app/book-pages/types/data";

const DeleteBook = <TData extends BookData>({
  data,
  refetch,
}: {
  data: TData | TData[];
  refetch: () => void;
}) => {
  const { isOpen, open, close } = useDisclosure();
  const dataArray = Array.isArray(data) ? data : [data]; 


  return (
    dataArray &&
    dataArray?.length > 0 && (
      <>
        <Button
          className="bg-red-600 text-white hover:bg-red-900 rounded-[10px]"
          onClick={open}
        >
          {dataArray?.length === 1 ? "Delete" : "Delete All"}
        </Button>
        <DeleteBookModal
          data={dataArray}
          close={close}
          isOpen={isOpen}
          refetch={refetch}
        />
      </>
    )
  );
};

export default DeleteBook;
