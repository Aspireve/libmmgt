export interface BookData {
  book_institute_uuids: string[];
  journal_institute_uuid: string | null;
  publisher: string;
  total_count: number;
  available_count: number;
  is_archived: boolean;
  item_id: string | null;
  category: string | null;
  subscription_id: string | null;
  subscription_start_date: string | null;
  subscription_end_date: string | null;
  volume_number: string | null;
  frequency: string | null;
  issue_number: string | null;
  vendor_name: string | null;
  subscription_price: number | null;
  library_name: string | null;
  classification_number: string | null;
  journal_created_at: string | null;
  journal_updated_at: string | null;
  journal_title_images: string[] | null;
  journal_title_description: string | null;
  journal_additional_fields: object | null;
  book_title: string;
  book_author: string;
  year_of_publication: string;
  edition: string;
  isbn: string;
  no_of_pages: number;
  no_of_preliminary_pages: number;
  subject: string;
  department: string;
  call_number: string;
  author_mark: string;
  item_type: string;

  book_title_id: string;
  book_uuid: string;
}
