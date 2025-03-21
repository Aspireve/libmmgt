// studentprofile.ts

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
}

/** 2) Borrowed Book Interface & Sample Data */
export interface BorrowedBook {
  book_id: string;
  book_name: string;
  department: string;
  issue_date: string;
  return_date: string;
}

export const borrowedBooks: BorrowedBook[] = [
  {
    book_id: "3066",
    book_name: "HC Verma",
    department: "Computer Science",
    issue_date: "12-2-2025",
    return_date: "16-2-2025",
  },
  {
    book_id: "3065",
    book_name: "RD Sharma",
    department: "Computer Science",
    issue_date: "05-2-2025",
    return_date: "12-2-2025",
  },
  {
    book_id: "3064",
    book_name: "Digital Signal Processing",
    department: "Electronics",
    issue_date: "26-1-2025",
    return_date: "05-2-2025",
  },
  {
    book_id: "3063",
    book_name: "Strength of Materials",
    department: "Electronics",
    issue_date: "12-1-2025",
    return_date: "26-1-2025",
  },
  {
    book_id: "3062",
    book_name: "Surveying Vol. 1",
    department: "Electronics",
    issue_date: "05-1-2025",
    return_date: "12-1-2025",
  },
];

/** 3) Borrowed Books Columns */
export const borrowedBooksColumns = [
  {
    accessorKey: "book_id",
    header: "Book ID",
    // Format book ID with a '#' prefix
    cell: ({ row }: any) => `#${row.original.book_id}`,
  },
  {
    accessorKey: "book_name",
    header: "Book Name",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "issue_date",
    header: "Issue Date",
  },
  {
    accessorKey: "return_date",
    header: "Return Date",
  },
];

/** 4) Student Activities Columns (add if needed) */
export const studentActivitiesColumns = [
  {
    accessorKey: "activity_id",
    header: "Book ID",
  },
  {
    accessorKey: "activity_type",
    header: "Book Name",
  },
  {
    accessorKey: "new_book_title.department",
    header: "Department",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
  {
    accessorKey: "date",
    header: "Time",
  },
];

/** 5) Profile Data Fields (used for displaying student info) */
export const profiledata = [
  {
    name: "student_name",
    label: "Full Name",
    key: "student_name",
    type: "text",
  },
  {
    name: "department",
    label: "Department",
    key: "department",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    key: "email",
    type: "email",
  },
  {
    name: "phone_no",
    label: "Phone Number",
    key: "phone_no",
    type: "tel",
  },
  {
    name: "roll_no",
    label: "Roll No.",
    key: "roll_no",
    type: "text",
  },
  {
    name: "date_of_birth",
    label: "Date of Birth",
    key: "date_of_birth",
    type: "date",
  },
  {
    name: "address",
    label: "Address",
    key: "address",
    type: "textarea",
  },
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
