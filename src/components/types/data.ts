export interface BookData {
    book_title: string;
    book_author: string;
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
    institute_uuid: string
  }