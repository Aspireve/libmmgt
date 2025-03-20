import React from "react";
import { Button } from "../ui/button";
import { useDeleteMany } from "@refinedev/core";
import { StudentFromDatabase } from "@/types/student";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const DeleteStudent = <TData extends StudentFromDatabase>({
  data,
  refetch,
}: {
  data: TData[];
  refetch: () => void;
}) => {
  const { mutate, isLoading } = useDeleteMany();

  const handleDelete = async () => {
    mutate({
      resource: "student/bulk-delete",
      ids: data.map((item) => item.student_uuid),
      invalidates: ["list"],
      successNotification: (data, ids, resource) => {
        toast.success("Data Deleted Successfully")
        refetch();
        return {
          message: `Data deleted successfully`,
          type: "success",
        };
      },
      errorNotification: () => {
        toast.error("Something went wrong")
        return {
          message: `Something went wrong`,
          type: "error",
        };
      },
    });
  };

  return (
    data &&
    data?.length > 0 && (
      <Button
        className="bg-red-600 text-white hover:bg-red-900 rounded-[10px]"
        onClick={handleDelete}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Deleting...
          </>
        ) : data?.length === 1 ? (
          "Delete"
        ) : (
          "Delete All"
        )}
      </Button>
    )
  );
};

export default DeleteStudent;
