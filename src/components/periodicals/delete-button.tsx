import React from "react";
import { Button } from "../ui/button";
import useDisclosure from "@/hooks/disclosure-hook";
import DeletePeriodicalModal from "./delete-periodical-modal";
import { JournalData } from "@/app/periodicals-pages/types/data";

const DeletePeriodical = <TData extends JournalData>({
  data,
  refetch,
}: {
  data: TData | TData[];
  refetch: () => void;
}) => {
  const { isOpen, open, close } = useDisclosure();
  const dataArray = Array.isArray(data) ? data : [data]; 

  return (
   
    dataArray?.length > 0 && (
      <>
        <Button
          className="bg-red-600 text-white hover:bg-red-900 rounded-[10px]"
          onClick={open}
        >
          {dataArray?.length === 1 ? "Delete" : "Delete All"}
        </Button>
        <DeletePeriodicalModal
          data={dataArray}
          close={close}
          isOpen={isOpen}
          refetch={refetch}
        />
      </>
    )
  );
};

export default DeletePeriodical;
