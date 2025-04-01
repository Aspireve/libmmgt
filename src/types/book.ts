export enum ActivityType {
  Borrowed = "borrowed",
  Read = "read",
  Returned = "returned",
}

export enum ActionType {
  CHECK_IN = "Check In",
  CHECK_OUT = "Check Out",
}

export interface BookData{
  book_uuid:string;
  book_title_id:string
  book_title:string;
  book_author:string;
  name_of_publisher: string;
  place_of_publication: string;
  year_of_publication: string;
  language: string;
  edition: string;
  isbn: string;
  no_of_pages: string;
  no_of_preliminary: string;
  subject: string;
  department: string;
  author_mark: string;
  call_number: string;
  is_archived:boolean;
  total_count:number;
  available_count:number;
  updated_at:string;
  created_at:string;
  title_additional_fields?: {} | null;
  title_description?: string | null;
  title_images?: [] | null;
}

export interface BookImportField {
  book_title: string;
  book_author: string;
  name_of_publisher: string;
  place_of_publication: string;
  year_of_publication: string;
  language: string;
  edition: string;
  isbn: string;
  no_of_pages: string;
  no_of_preliminary: string;
  subject: string;
  department: string;
  call_number: string;
  author_mark: string;
  source_of_acquisition?: string;
  date_of_acquisition?: string;
  inventory_number: string;
  accession_number: string;
  barcode?: string;
  item_type?: string;
  bill_no: string;
}

export interface EditBook{
  book_title: string;
  book_title_id: string;
  book_uuid: string;
  author_mark: string;
  book_author: string;
  call_number: string;
  department: string;
  edition: string;
  is_archived: boolean;
  isbn: string;
  name_of_publisher: string;
  no_of_pages: number;
  no_of_preliminary: number;
  place_of_publication: string;
  subject: string;
  title_additional_fields?: {} | null;
  title_description?: string | null;
  title_images?: [] | null;
  available_count: number;
  total_count: number;
  created_at: string;
  updated_at: string;
  year_of_publication: string;
}

export interface AddBookType extends BookImportField {
  institute_uuid: string;
  institute_name: string;
}



