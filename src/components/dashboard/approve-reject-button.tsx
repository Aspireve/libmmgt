import { useCreate, useUpdate } from "@refinedev/core";
import { toast } from "sonner";
import TooltipToggle from "../custom/tooltip-toggle";
import { Button } from "../ui/button";
import { BookCheckIcon, CircleXIcon } from "lucide-react";

enum RequestType {
  ISSUE = "issue",
  REISSUE = "re-issue",
  RETURN = "return",
  NOTES = "notes",
}

export const ApproveRejectButton = ({
  requestId,
  requestType,
  refetch,
}: {
  requestId: string;
  requestType: RequestType;
  refetch: () => Promise<unknown>;
}) => {
  const { mutate: createMutate, isLoading: isCreateLoading } = useCreate();
  const { mutate: updateMutate, isLoading: isUpdateLoading } = useUpdate();

  const handleRequestAction = async (
    requestId: string,
    status: "approved" | "rejected",
    requestType: "issue" | "re-issue" | "return" | "notes"
  ) => {
    if (requestType === "issue") {
      // For issue requests, use POST method
      const endpoint = "book_v2/request_booklog_issue_ar";

      createMutate(
        {
          resource: endpoint,
          values: {
            request_id: requestId,
            status: status,
          },
        },
        {
          onSuccess: () => {
            toast.success(
              `Request ${
                status === "approved" ? "approved" : "declined"
              } successfully!`
            );
          },
          onError: (error) => {
            toast.error(
              error?.message ||
                "An error occurred while processing the request."
            );
          },
        }
      );
    } else if (requestType === "return") {
      // For issue requests, use POST method
      const endpoint = "book_v2/request_booklog_return_ar";

      createMutate(
        {
          resource: endpoint,
          values: {
            request_id: requestId,
            status: status,
          },
        },
        {
          onSuccess: () => {
            toast.success(
              `Request ${
                status === "approved" ? "approved" : "declined"
              } successfully!`
            );
          },
          onError: (error) => {
            toast.error(
              error?.message ||
                "An error occurred while processing the request."
            );
          },
        }
      );
    } else if (requestType === "notes") {
      // For issue requests, use POST method
      const method = status === "approved" ? "PATCH" : "DELETE";
      const endpoint = `notes?_notes_uuid=${requestId}`;

      updateMutate(
        {
          resource: endpoint,
          id: "",
          values: {},
          meta: { method },
        },
        {
          onSuccess: () => {
            toast.success(
              `Notes ${
                status === "approved" ? "approved" : "declined"
              } successfully!`
            );
          },
          onError: (error) => {
            toast.error(
              error?.message ||
                "An error occurred while processing the request."
            );
          },
        }
      );
    } else {
      // For re-issue requests, use PUT method
      const endpoint = "book_v2/request_booklog_reissue_ar";

      updateMutate(
        {
          resource: endpoint,
          id: "", // Even if empty, this is needed for the useUpdate hook
          values: {
            request_id: requestId,
            status: status,
          },
          meta: {
            method: "PUT", // Explicitly set the method to PUT
          },
        },
        {
          onSuccess: () => {
            toast.success(
              `Request ${
                status === "approved" ? "approved" : "declined"
              } successfully!`
            );
          },
          onError: (error) => {
            toast.error(
              error?.message ||
                "An error occurred while processing the request."
            );
          },
        }
      );
    }
  };

  const isLoading = isCreateLoading || isUpdateLoading;

  return (
    <div className="flex gap-2 items-center">
      <TooltipToggle content="Accept">
        <Button
          variant="ghost"
          size="icon"
          className="text-[#0D894F]"
          onClick={async () => {
            await handleRequestAction(requestId, "approved", requestType);
            refetch();
          }}
          disabled={isLoading}
        >
          <BookCheckIcon />
        </Button>
      </TooltipToggle>
      <TooltipToggle content="Decline">
        <Button
          variant="ghost"
          size="icon"
          className="text-[#F04438]"
          onClick={async () => {
            await handleRequestAction(requestId, "rejected", requestType);
            refetch();
          }}
          disabled={isLoading}
        >
          <CircleXIcon />
        </Button>
      </TooltipToggle>
    </div>
  );
};
