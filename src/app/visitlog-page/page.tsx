"use client";

import React, { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useList, useDelete, GetListResponse } from "@refinedev/core";
import Header from "../Header/header";
import { visitLogColumns as originalVisitLogColumns, fallbackVisitLogData, VisitLog } from "../visitlog-page/columns";
import { DataTable } from "@/components/data-tables/data-table";
import { Button } from "@/components/ui/button";
import DeleteBtn from "../../images/DeleteBtn.png";
import { toast } from "sonner";

const Page = () => {
  const queryClient = useQueryClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [visitLogToDelete, setVisitLogToDelete] = useState<string | null>(null);

  // Fetch visit logs using Refine's useList hook
  const { data: visitLogsResponse, isLoading } = useList<VisitLog>({
    resource: "visitlogs",
    pagination: { current: 1, pageSize: 100 },
    queryOptions: {
      queryKey: ["visitlogs"],
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      initialData: { 
        data: fallbackVisitLogData, 
        total: fallbackVisitLogData.length 
      } as GetListResponse<VisitLog>,
    },
  });

  // Extract the data array from the response, fallback to initial data if undefined
  const visitLogs = visitLogsResponse?.data ?? fallbackVisitLogData;

  // Delete mutation using Refine's useDelete hook
  const { mutate: deleteVisitLog } = useDelete();

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      new Promise<void>((resolve, reject) => {
        deleteVisitLog(
          { resource: "visitlogs", id },
          {
            onSuccess: () => resolve(),
            onError: (error) => reject(error),
          }
        );
      }),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["visitlogs"] });
      const previousVisitLogs = queryClient.getQueryData<GetListResponse<VisitLog>>(["visitlogs"]) || 
        { data: visitLogs, total: visitLogs.length };
      const optimisticVisitLogs = previousVisitLogs.data.filter((log) => log.id !== id);
      queryClient.setQueryData(["visitlogs"], { 
        ...previousVisitLogs, 
        data: optimisticVisitLogs,
        total: optimisticVisitLogs.length 
      });
      return { previousVisitLogs };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["visitlogs"], context?.previousVisitLogs);
      toast.error("Error deleting visit log: " + (err instanceof Error ? err.message : "Unknown error"), {
        position: "top-center",
      });
      setShowConfirmModal(false);
      setVisitLogToDelete(null);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["visitlogs"] });
    },
    onSuccess: () => {
      toast.success("Visit log deleted successfully!", { position: "top-center" });
      setShowConfirmModal(false);
      setVisitLogToDelete(null);
    },
  });

  const confirmDelete = (id: string) => {
    setVisitLogToDelete(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    if (!visitLogToDelete) return;
    deleteMutation.mutate(visitLogToDelete);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setVisitLogToDelete(null);
  };

  const visitLogColumns = originalVisitLogColumns.concat({
    id: "actions",
    header: "",
    cell: ({ row }: any) => {
      const visitLog: VisitLog = row.original;
      return (
        <div className="flex gap-2">
          <button onClick={() => confirmDelete(visitLog.id)} aria-label="Delete visit log">
            <img src={DeleteBtn.src} alt="Delete" />
          </button>
        </div>
      );
    },
  });

  return (
    <>
      <Header />
      {isLoading ? (
        <div className="p-4 text-center">Loading data...</div>
      ) : (
        <div className="border border-[#E0E2E7] rounded-[10px] w-[90%] ml-10 mt-6">
          <DataTable columns={visitLogColumns} data={visitLogs} />
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this visit log?</p>
            <div className="flex justify-end gap-4">
              <Button onClick={handleCancelDelete} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} className="bg-red-600 text-white hover:bg-red-600">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;