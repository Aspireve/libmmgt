export interface BookData {
    book_uuid:string
    book_title: string;
    book_author: string;
    total_count:number;
    available_count:number;
    name_of_publisher: string;
    place_of_publication: string;
    year_of_publication: string;
    language: string;
    edition: string;
    isbn: string;
    no_of_pages: number;
    no_of_preliminary_pages: number;
    subject: string;
    department: string;
    call_number: string;
    author_mark: string;
    source_of_acquisition?: string;
    date_of_acquisition?: string;
    inventory_number: number;
    accession_number: number;
    barcode?: string;
    item_type?: string;
    bill_no: number;
    institute_uuid: string;
    // is_archived:Boolean;
  }

    // Routes 
  export const bookRoutes = [
    { key: "all-books", label: "All Books", path: "/book-pages/all-books" },
    { key: "journal-page", label: "Journals", path: "/book-pages/journal-page" },
    { key: "magzine-page", label: "Magzines", path: "/book-pages/magzine-page" },
  ];

  export const addbookRoutes = [
    { key: "add-book", label: "Add Book", path: "/book-pages/add-book" },
    { key: "add-journal", label: "Add journal/Magzine", path: "/book-pages/add-journal" }, 
]

export const bookdetailsRoutes = [
  { key: "book-borrowed", label: "Book Borrowed By", path: "/book-pages/book-borrowed" },
  { key: "book-activites", label: "Book Activites", path: "/book-pages/book-activites" }, 
]
  
// Dummy Data 
export const dummyBooks: BookData[] = [
  {
    book_uuid: "B001",
    book_title: "The Art of Programming",
    book_author: "Donald Knuth",
    available_count:3,
    name_of_publisher: "Addison-Wesley",
    place_of_publication: "USA",
    year_of_publication: "1968",
    language: "English",
    edition: "3rd",
    isbn: "978-0201896831",
    no_of_pages: 672,
    no_of_preliminary_pages: 12,
    subject: "Computer Science",
    department: "Engineering",
    call_number: "QA76.6.K64",
    author_mark: "KN",
    source_of_acquisition: "Library Fund",
    date_of_acquisition: "2023-01-15",
    inventory_number: 1001,
    accession_number: 5001,
    barcode: "1234567890123",
    item_type: "Hardcover",
    bill_no: 202301,
    institute_uuid: "INS-12345",
    total_count:3

  },
  {
    book_uuid: "B002",
    book_title: "Introduction to Algorithms",
    book_author: "Cormen, Leiserson, Rivest, Stein",
    available_count:3,
    name_of_publisher: "MIT Press",
    place_of_publication: "Cambridge, MA",
    year_of_publication: "2009",
    language: "English",
    edition: "3rd",
    isbn: "978-0262033848",
    no_of_pages: 1312,
    no_of_preliminary_pages: 20,
    subject: "Algorithms",
    department: "Computer Science",
    call_number: "QA76.6.C66",
    author_mark: "CLRS",
    source_of_acquisition: "University Grant",
    date_of_acquisition: "2023-05-10",
    inventory_number: 1002,
    accession_number: 5002,
    barcode: "9876543210987",
    item_type: "Paperback",
    bill_no: 202302,
    institute_uuid: "INS-12345",
    total_count:3

  },
  {
    book_uuid: "B003",
    book_title: "Clean Code",
    book_author: "Robert C. Martin",
    available_count:3,
    name_of_publisher: "Prentice Hall",
    place_of_publication: "New Jersey",
    year_of_publication: "2008",
    language: "English",
    edition: "1st",
    isbn: "978-0132350884",
    no_of_pages: 464,
    no_of_preliminary_pages: 8,
    subject: "Software Engineering",
    department: "IT",
    call_number: "QA76.76.M34",
    author_mark: "RCM",
    source_of_acquisition: "Donation",
    date_of_acquisition: "2023-07-22",
    inventory_number: 1003,
    accession_number: 5003,
    barcode: "4567890123456",
    item_type: "Hardcover",
    bill_no: 202303,
    institute_uuid: "INS-12345",
    total_count:3
  }
];