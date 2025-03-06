// studentprofile.ts

export interface StudentProfileData {
  student_id?: string;
  student_name?: string;
  department?: string;
  email?: string;
  phone_no?: string;
  roll_no?: string;
  year_of_admission?: string;
  address?: string;
}

export interface BorrowedBook {
    book_id: string;
    book_name: string;
    department: string;
    issue_date: string;
    return_date: string;
  }
  
 
  export const borrowedBooks: BorrowedBook[] = [
    { book_id: "3066", book_name: "HC Verma", department: "Computer Science", issue_date: "12-2-2025", return_date: "16-2-2025" },
    { book_id: "3065", book_name: "RD Sharma", department: "Computer Science", issue_date: "05-2-2025", return_date: "12-2-2025" },
    { book_id: "3064", book_name: "Digital Signal Processing", department: "Electronics", issue_date: "26-1-2025", return_date: "05-2-2025" },
    { book_id: "3063", book_name: "Strength of Materials", department: "Electronics", issue_date: "12-1-2025", return_date: "26-1-2025" },
    { book_id: "3062", book_name: "Surveying Vol. 1", department: "Electronics", issue_date: "05-1-2025", return_date: "12-1-2025" },
  ];
  

  export const borrowedBooksColumns = [
    {
      accessorKey: "book_id",
      header: "Book ID",
      cell: ({ row }: any) => `#${row.original.book_id}`, // Format book ID with #
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
      name: "year_of_admission",
      label: "Year of Admission",
      key: "year_of_admission",
      type: "date",
    },
    {
      name: "address",
      label: "Address",
      key: "address",
      type: "textarea",
    },
  ];
  

  export const studentprofileRoutes = [
    { key: "student-profile", label: "Borrowed Books", path: "/student-page/student-profile" },
    { key: "import", label: "Activities", path: "/student-page/import-students" },
  ];
  