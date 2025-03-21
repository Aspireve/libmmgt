import React from "react";
import { Button } from "../ui/button";
import { useDeleteMany } from "@refinedev/core";
import { StudentFromDatabase } from "@/types/student";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import useDisclosure from "@/hooks/disclosure-hook";
import DeleteStudentModal from "./delete-student-modal";

const DeleteStudent = <TData extends StudentFromDatabase>({
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
        <DeleteStudentModal
          data={data}
          close={close}
          isOpen={isOpen}
          refetch={refetch}
        />
      </>
    )
  );
};

export default DeleteStudent;
