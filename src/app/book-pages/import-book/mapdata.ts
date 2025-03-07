import { BookData } from '../types/data'

export type MappingType = {
    [key in keyof BookData]?: string;
  };
export const initialMapping: MappingType = {
  book_title: "",
  book_author: "",
  name_of_publisher: "",
  place_of_publication: "",
  year_of_publication: "",
  language: "",
  edition: "",
  isbn: "",
  no_of_pages: "",
  no_of_preliminary_pages: "",
  subject: "",
  department: "",
  call_number: "",
  author_mark: "",
  source_of_acquisition: "",
  date_of_acquisition: "",
  inventory_number: "",
  accession_number: "",
  barcode: "",
  item_type: "",
  bill_no: "",
};