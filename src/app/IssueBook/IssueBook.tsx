// "use client";

// import React from "react";
// import { useForm } from "@tanstack/react-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { ActionType } from "@/types/book";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export default function IssueBook() {
//   const form = useForm({
//     defaultValues: {
//       action: ActionType.CHECK_IN,
//       bookId: "",
//       bookName: "",
//       studentId: "",
//     },
//     onSubmit: ({ value }) => {
//       const actionType =
//         value.action === ActionType.CHECK_IN ? "Issue Book" : "Return Book";
//       console.log("Submitted:", { actionType, ...value });
//       form.reset();
//     },
//   });

//   return (
//     <div className="border border-[#AEB1B9] shadow-[#AEB1B9] max-w-[90%] h-[190px] rounded-[12px] bg-[#F3F4F6] ml-10 mt-5 p-6">
//       <div className="flex items-center mb-4 gap-6">
//         <h2 className="text-2xl font-semibold">
//           {form.getFieldValue("action") === ActionType.CHECK_IN
//             ? "Issue Book"
//             : "Return a Book"}
//         </h2>
//         <form.Field
//           name="action"
//           children={(field) => (
//             <Select
//               value={field.state.value}
//               onValueChange={(value) => field.handleChange(value as ActionType)}
//             >
//               <SelectTrigger className="w-[180px] bg-white border border-[#1E40AF] text-[#1E40AF] rounded-[5px]">
//                 <SelectValue placeholder="Select Type" />
//               </SelectTrigger>
//               <SelectContent className="bg-white text-[#1E40AF] rounded-[5px]">
//                 <SelectItem value={ActionType.CHECK_IN}>Check In</SelectItem>
//                 <SelectItem value={ActionType.CHECK_OUT}>Check Out</SelectItem>
//               </SelectContent>
//             </Select>
//           )}
//         />
//       </div>
//       <form onSubmit={form.handleSubmit} className="flex flex-wrap gap-4">
//         <form.Field
//           name="bookId"
//           children={(field) => (
//             <div className="flex-1 min-w-[200px]">
//               <Label htmlFor="bookId" className="text-[#1F2937] mb-1">
//                 Book ID
//               </Label>
//               <Input
//                 id="bookId"
//                 placeholder="Enter Book ID"
//                 value={field.state.value}
//                 onChange={(e) => field.handleChange(e.target.value)}
//                 className="bg-white border border-[#D5D7DA] rounded-[8px] text-[#1F2937]"
//               />
//             </div>
//           )}
//         />

//         <form.Field
//           name="bookName"
//           children={(field) => (
//             <div className="flex-1 min-w-[200px]">
//               <Label htmlFor="bookName" className="text-[#1F2937] mb-1">
//                 Name of the Book
//               </Label>
//               <Input
//                 id="bookName"
//                 placeholder="Enter Book Name"
//                 value={field.state.value}
//                 onChange={(e) => field.handleChange(e.target.value)}
//                 className="bg-white border border-[#D5D7DA] rounded-[8px] text-[#1F2937]"
//               />
//             </div>
//           )}
//         />

//         <form.Field
//           name="studentId"
//           children={(field) => (
//             <div className="flex-1 min-w-[200px]">
//               <Label htmlFor="studentId" className="text-[#1F2937] mb-1">
//                 Student ID
//               </Label>
//               <Input
//                 id="studentId"
//                 placeholder="Enter Student ID"
//                 value={field.state.value}
//                 onChange={(e) => field.handleChange(e.target.value)}
//                 className="bg-white border border-[#D5D7DA] rounded-[8px] text-[#1F2937]"
//               />
//             </div>
//           )}
//         />

//         <div className="flex items-center gap-2 ml-auto">
//           <Button
//             type="button"
//             onClick={() => form.reset()}
//             className="mt-5 rounded-[5px] border border-[#1E40AF] bg-white text-[#1E40AF]"
//           >
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             className="mt-5 rounded-[5px] border border-[#1E40AF] bg-[#1E40AF] text-[#fff] hover:bg-[#1E40AF]"
//           >
//             Submit
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }
