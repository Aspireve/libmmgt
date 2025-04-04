"use client";

import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionType } from "@/types/book";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreate } from "@refinedev/core";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function IssueBook({
  setRefreshAction,
}: {
  setRefreshAction: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [action, setAction] = useState<ActionType>(ActionType.CHECK_IN);
  const { mutate, isLoading } = useCreate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate(
      {
        resource: "/book_v2/update-book-log",

        values: {
          book_copy_id: form.getFieldValue("bookId"),
          // book_copy_id: form.getFieldValue("bookId"),
          student_id: form.getFieldValue("studentId"),
          action: action === ActionType.CHECK_IN ? "borrow" : "return",
        },
      },
      {
        onSuccess: () => {
          toast.success(`Book ${action} Successfully!`);
          form.reset();
          setRefreshAction((prev: number) => prev + 1);
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong!";
          toast.error(`Error ${action} Book: ${errorMessage}`);
        },
      }
    );
  };

  const form = useForm({
    defaultValues: {
      action: ActionType.CHECK_IN,
      bookId: "",
      studentId: "",
    },
  });

  return (
    <div
      className="transition-all duration-300 shadow-lg  rounded-[12px] my-6 p-6 border border-[#E9EAEB]"
      style={{ boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)" }}
      >
      <div className="flex items-center mb-4 gap-6">
        <h2 className="text-2xl font-semibold">
          {action === ActionType.CHECK_IN ? "Issue Book" : "Return a Book"}
        </h2>
        <form.Field name="action">
          {(field) => (
            <Select
              value={action}
              onValueChange={(value) => setAction(value as ActionType)}
            >
              <SelectTrigger className="w-[180px] bg-white border border-[#1E40AF] text-[#1E40AF] rounded-[5px]">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent className="bg-white text-[#1E40AF] rounded-[5px]">
                <SelectItem value={ActionType.CHECK_IN}>Check In</SelectItem>
                <SelectItem value={ActionType.CHECK_OUT}>Check Out</SelectItem>
              </SelectContent>
            </Select>
          )}
        </form.Field>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
        <form.Field name="studentId">
          {(field) => (
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="studentId" className="text-[#1F2937] mb-1">
                Student ID
              </Label>
              <Input
                id="studentId"
                placeholder="Enter Student ID"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-white border border-[#D5D7DA] rounded-[8px] text-[#1F2937] placeholder:text-[#aaa]"
                required
              />
            </div>
          )}
        </form.Field>
        <form.Field name="bookId">
          {(field) => (
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="bookId" className="text-[#1F2937] mb-1">
                Book ID
              </Label>
              <Input
                id="bookId"
                placeholder="Enter Book ID"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-white border border-[#D5D7DA] rounded-[8px] text-[#1F2937] placeholder:text-[#aaa]"
                required
              />
            </div>
          )}
        </form.Field>

        {/* <form.Field name="barcode">
          {(field) => (
            <div className="flex-1 min-w-[200px]">
              <Label className="text-[#1F2937] mb-1">Barcode of Book</Label>
              <Input
                id="barcode"
                placeholder="Enter Book Barcode"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-white border border-[#D5D7DA] rounded-[8px] text-[#1F2937]"
                required
              />
            </div>
          )}
        </form.Field> */}

        <div className="flex items-center gap-2 ml-auto">
          <Button
            type="button"
            onClick={() => form.reset()}
            className="mt-5 rounded-[5px] border border-[#1E40AF] bg-white text-[#1E40AF]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="mt-5 rounded-[5px] border border-[#1E40AF] bg-[#1E40AF] text-[#fff] hover:bg-[#1E40AF]"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Loading...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
