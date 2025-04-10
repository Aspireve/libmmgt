import React from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useDeleteMany } from "@refinedev/core";
import { toast } from "sonner";

const DeleteStudentModal = ({
  data,
  refetch,
  close,
  isOpen,
}: {
  data: any[];
  refetch: () => void;
  close: () => void;
  isOpen: boolean;
}) => {
  const { mutate, isLoading } = useDeleteMany();

  const handleDelete = async () => {
    // console.log("Data", data);
    mutate({
      resource: "student/bulk-delete",
      ids: data.map((item) => item.student_uuid),
      invalidates: ["list", "all"],
      successNotification: (data, ids, resource) => {
        close();
        toast.success("Data Deleted Successfully");
        refetch();
        return {
          message: `Data deleted successfully`,
          type: "success",
        };
      },
      errorNotification: () => {
        toast.error("Something went wrong");
        return {
          message: `Something went wrong`,
          type: "error",
        };
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 w-80 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
        <p className="mb-6">
          {data.length === 1
            ? "Are you sure you want to delete this student?"
            : "Are you sure you want to delete these students?"}
        </p>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={close} className="shadow-none">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Deleting...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteStudentModal;
