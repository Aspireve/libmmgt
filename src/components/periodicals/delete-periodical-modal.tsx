import React from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useDeleteMany } from "@refinedev/core";
import { toast } from "sonner";

const DeletePeriodicalModal = ({
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
    mutate({
      resource: "book_v2/bulk-delete",
      ids: data.map((item) => item.journal_copy_uuid),
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
            ? "Are you sure you want to delete this Journal?"
            : "Are you sure you want to delete these Journals?"}
        </p>
        <div className="flex justify-end gap-4">
          <Button onClick={close} className="shadow-none">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-600 text-white hover:bg-red-700 rounded-xl w-full"
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

export default DeletePeriodicalModal;

