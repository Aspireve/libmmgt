import React from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useDeleteMany } from "@refinedev/core";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
      ids: data.map((item) => item.barCode),
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
    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="bg-white p-6 rounded-xl">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            {data.length === 1
              ? "Are you sure you want to delete this student?"
              : "Are you sure you want to delete these students?"}
          </DialogDescription>
        </DialogHeader>
        {/* <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
        <p className="mb-6">
          {data.length === 1
            ? "Are you sure you want to delete this student?"
            : "Are you sure you want to delete these students?"}
        </p> */}
        <DialogFooter className="flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant="outline" onClick={close} className="shadow-none">
              Cancel
            </Button>
          </DialogClose>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
    // </div>
  );
};

export default DeleteStudentModal;
