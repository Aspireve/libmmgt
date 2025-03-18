export const bibliographic = [
    { label: "Book Title", name: "book_title", type:"text", required: "Book Name is required", placeholder: "Enter book name"},
    { label: "Book Author", name: "book_author", type:"text", required: "Book Author is required", placeholder: "Enter Book Author" },
    { label: "Name of Publisher", name: "name_of_publisher", type:"text", required: "Publisher Name is required", placeholder: "Enter Publisher Name" },
    { label: "Place of Publication", name: "place_of_publication", type:"text", required: "Publication place required", placeholder: "Enter Publication place" },
    { label: "Year of Publication", name: "year_of_publication", type:"date", required: "Year is required", placeholder: "Enter Year of publication" },
    { label: "Language", name: "language", type:"text", required: "Language is required", placeholder: "Enter Language" },
    { label: "Edition", name: "edition", type:"text", required: "Edition is required", placeholder: "Enter Edition" },
    { label: "ISBN", name: "isbn", type:"text", required: "ISBN is required", placeholder: "Enter ISBN" },
    { label: "No. of Pages", name: "no_of_pages", type:"number", required: "Number of pages is required", placeholder: "Enter No. of Pages" },
    { label: "No. of Preliminary Pages", name: "no_of_preliminary", type:"number", required: "Preliminary pages are required", placeholder: "Enter No. of Preliminary Pages" },
    { label: "Subject", name: "subject", required: "Subject is required", type:"text", placeholder: "Enter Subject" },
    { label: "Department", name: "department", required: "Department is required", type:"text", placeholder: "Enter Department" }
  ];

  export const cataloging = [
    { label: "Call Number", name: "call_number", required: "Call Number is required", type:"text", placeholder: "Enter Call Number" },
    { label: "Author Mark", name: "author_mark", required: "Author Mark is required", type:"text", placeholder: "Enter Author Mark" }
  ];

  export const acquisition = [
    { label: "Source of Acquisition", name: "source_of_acquisition",type:"text", required: "Source of Acquisition is required", placeholder: "Enter Source of Acquisition" },
    { label: "Date of Acquisition", name: "date_of_acquisition", type:"date", required: "Date of Acquisition is required", placeholder: "Enter Date of Acquisition" },
    { label: "Bill Number", name: "bill_no", required: "Bill Number is required", type:"number", placeholder: "Enter Bill Number" },
    // { label: "Bill Date", name: "bill_date", required: "Bill Date is required", placeholder: "Enter Bill Date" }
  ];

  export const inventory = [
    { label: "Inventory Number", name: "inventory_number", type:"number", required: "Inventory Number is required", placeholder: "Enter Inventory Number" },
    { label: "Accession Number", name: "accession_number", type:"number", required: "Accession Number is required", placeholder: "Enter Accession Number" },
    { label: "Barcode", name: "barcode", type:"text", required: "Barcode is required", placeholder: "Enter Barcode" },
    { label: "Item Type", name: "item_type", type:"text", required: "Item Type is required", placeholder: "Enter Item Type" }
  ];