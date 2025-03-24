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
  no_of_preliminary: "",
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

export const fieldLabels: Partial<Record<keyof BookData, string>> = {
  book_title: "Book Title",
  book_author: "Book Author",
  name_of_publisher: "Name of Publisher",
  place_of_publication: "Place of Publication",
  year_of_publication: "Year of Publication",
  language: "Language",
  edition: "Edition",
  isbn: "ISBN",
  no_of_pages: "Number of Pages",
  no_of_preliminary: "Number of Preliminary Pages",
  subject: "Subject",
  department: "Department",
  call_number: "Call Number",
  author_mark: "Author Mark",
  source_of_acquisition: "Source of Acquisition",
  date_of_acquisition: "Date of Acquisition",
  inventory_number: "Inventory Number",
  accession_number: "Accession Number",
  barcode: "Barcode",
  item_type: "Item Type",
  bill_no: "Bill Number",
};
