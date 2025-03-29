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
  institute_uuid?: string | undefined;
  created_at: string;
  updated_at: string;
  is_archived: Boolean;
  is_available:Boolean;
  book:any,
  copies:any,
  title:any,
  title_images:[],
  remarks:string,
  title_additional_fields:{},
  title_description:string,
}


