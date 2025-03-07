"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
  

export default function IssueBook() {
  const [action, setAction] = useState("Check In");
  const [bookId, setBookId] = useState("");
  const [bookName, setBookName] = useState("");
  const [studentId, setStudentId] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const actionType = action === "Check In" ? "Issue Book" : "Return Book";
    console.log(`Submitted:`, { actionType, bookId, bookName, studentId });
    setBookId("");
    setBookName("");
    setStudentId("");
  };

  const handleCancel = () => {
    setBookId("");
    setBookName("");
    setStudentId("");
    setAction("Check In");
  };

  return (
    <div className="border border-[#AEB1B9] shadow-[#AEB1B9] max-w-[90%] h-[190px] rounded-[12px] bg-[#F3F4F6] ml-10 mt-5 p-6">
      <div className="flex items-center mb-4">
        <h2 className="text-3xl font-semibold text-black">
          {action === "Check In" ? "Issue Book" : "Return a Book"}
          </h2>
        <select
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className="bg-[#DBDDE2] border border-gray-300 rounded p-2 ml-5 w-34 h-[40px]"
        >
          <option>Check In</option>
          <option>Check Out</option>
        </select>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="bookId" className="text-[#1F2937] mb-1">
            Book ID
          </Label>
          <Input
            id="bookId"   
            placeholder="Enter book id"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            className="bg-white border border-[#D5D7DA] rounded-[8px] text-[#1F2937]"
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="bookName" className="text-[#1F2937] mb-1">
            Name of the Book
          </Label>
          <Input
            id="bookName"
            placeholder="Enter book name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
             className="bg-white border border-[#D5D7DA] rounded-[8px] text-[#1F2937]"
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="studentId" className="text-[#1F2937] mb-1">
            Student ID
          </Label>
          <Input
            id="studentId"
            placeholder="Enter student id"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
             className="bg-white border border-[#D5D7DA] rounded-[8px] text-[#1F2937]"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button
            type="button"
            onClick={handleCancel}
            className={"mt-5 rounded-[5px] border border-[#1E40AF] bg-white text-[#1E40AF]"}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className={"mt-5 rounded-[5px] border border-[#1E40AF] bg-[#1E40AF] text-[#fff] hover:bg-[#1E40AF]"}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
