// studentprofile.ts


import { formatDate } from "@/app/book-pages/hooks/formatDate";
import { ColumnDef } from "@tanstack/react-table";

/** 1) Student Profile Interface */
export interface StudentProfileData {
  student_id?: string;
  student_name?: string;
  department?: string;
  email?: string;
  phone_no?: string;
  roll_no?: string;
  year_of_admission?: string;
  address?: string;
  student_uuid?: string;
  date_of_birth?:string | undefined;
  gender?:string;
  image_field?: string;
}

/** 2) Borrowed Book Interface & Sample Data */
export interface BorrowedBook {
  book_copy_id: string;
  book_title: string;
  department: string;
  created_at: string;
  returned_at?: string;
}

export interface Activites {
  visitlog_id: string;
  action: string;
  department: string;
  student_uuid:string;
  visitor_name:string;
  in_time: string;
  out_time: string;
  student_id:string;
}
export const borrowedBooksColumns:ColumnDef<BorrowedBook>[] = [

    {
      accessorKey: "book_copy_id",
      header: "Book ID",

    },
    {
      accessorKey: "book_title",
      header: "Book Name",
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "created_at",
      header: "Issue Date",
      cell: ({ row }) => {
        return formatDate(row.original.created_at)
      },
      
    },
    {
      accessorKey: "returned_at",
      header: "Return Date",
      cell: ({ row }) => {
       return row.original.returned_at ? formatDate(row.original.returned_at) : "-"
      }
    },
  ];


export const studentActivitiesColumns:ColumnDef<Activites>[] =  [
  {
    accessorKey: "student_id",
    header: "Student",
  },
  {
    accessorKey: "visitor_name",
    header: "Vistor Name",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
  {
    accessorKey: "in_time",
    header: "In Time",
    cell :({row}) => {
      return formatDate(row.original.in_time);
    }
  },
  {
    accessorKey: "out_time",
    header: "Out Time",
    cell :({row}) => {
      return formatDate(row.original.out_time);
    }
  }
];

/** 5) Profile Data Fields (used for displaying student info) */
export const profiledata = [
  // {
  //   name: "student_name",
  //   label: "Full Name",
  //   key: "student_name",
  //   type: "text",
  // },
  // {
  //   name: "department",
  //   label: "Department",
  //   key: "department",
  //   type: "text",
  // },
  // {
  //   name: "email",
  //   label: "Email",
  //   key: "email",
  //   type: "email",
  // },
  // {
  //   name: "phone_no",
  //   label: "Phone Number",
  //   key: "phone_no",
  //   type: "tel",
  // },
  // {
  //   name: "roll_no",
  //   label: "Roll No.",
  //   key: "roll_no",
  //   type: "text",
  // },
  // {
  //   name: "date_of_birth",
  //   label: "Date of Birth",
  //   key: "date_of_birth",
  //   type: "date",
  // },
  {
    name: "address",
    label: "Address",
    key: "address",
    type: "textarea"
  },
  // {
  //   name: "year_of_admission",
  //   label:"Year Of Admission",
  //   key:"year_of_admission",
  //   type:"text"
  // },
  // {
  //   name:"gender",
  //   label:"Gender",
  //   key:"gender",
  //   type:"select"
  // }
];

/** 6) Student Profile Routes */
export const studentprofileRoutes = [
  {
    key: "borrowed",
    label: "Borrowed Books",
    path: "/student-page/student-borrowed-details",
  },
  {
    key: "activities",
    label: "Activities",
    path: "/student-page/student-details-activities",
  },
];
