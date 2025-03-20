export interface BookData {
  book_uuid: string;
  book_id: string;
  book_copy_uuid: string;
  book_title_id: string;
  book_title: string;
  book_author: string;
  total_count: number;
  available_count: number;
  name_of_publisher: string;
  place_of_publication: string;
  year_of_publication: string;
  language: string;
  edition: string;
  isbn: string;
  no_of_pages: number;
  no_of_preliminary: number;
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
  title_images: string;
  title_additional_fields: { message: string };
  title_description: string;
  created_at: string;
  updated_at: string;
  is_archived: Boolean;
  book:any,
  copies:any,
  title:any
}

export interface JournalData {
  journal_uuid: string;
  journal_id: string;
  name_of_journal: string;
  name_of_publisher: string;
  place_of_publisher: string;
  editor_name: string;
  year_of_publication: string; //frontend
  language: string; //frontend
  department: string; //frontend
  subscription_price: string;
  subscription_start_date: string;
  subscription_end_date: string;
  volume_number: string; //Changes
  issue_number: string;
  is_archived: boolean; //frontend
  total_count: number; //frontend
  available_count: number; //frontend
  frequency: number;
  item_type: string;
  issn: string;
  call_number: string;
  created_at: string; //frontend
  updated_at: string; //frontend
  vendor_name: string;
  library_name: string;
  acquisition_date: string; //frontend
}

// Routes 
export const bookRoutes = [
  { key: "all-books", label: "All Books", path: "/book-pages/all-books" },
  { key: "periodicals-page", label: "Periodicals", path: "/periodicals-pages/periodicals-page" },
];

export const addbookRoutes = [
  { key: "add-book", label: "Add Book", path: "/book-pages/add-book" },
  { key: "add-periodicals", label: "Add periodicals", path: "/periodicals-pages/add-periodicals" },
]

export const bookdetailsRoutes = [
  { key: "book-borrowed", label: "Book Borrowed By", path: "/book-pages/book-borrowed" },
  { key: "book-activites", label: "Book Activites", path: "/book-pages/book-activites" },
]

export const dashboardRoutes = [
  { key: "issue-book", label: "Issue Book", path: "" },
  { key: "request-book", label: "Request", path: "" },
]