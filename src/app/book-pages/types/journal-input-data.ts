  export const General_info = [
    { label: "Name of the Journal", type:"text", name: "name_of_journal", required: "Journal Name is required", placeholder: "Enter Journal Name" },
    { label: "Name of Publisher",type:"text", name: "name_of_publisher", required: "Publisher Name is required", placeholder: "Enter Publisher Name" },
    { label: "Place of Publisher", type:"text", name: "place_of_publisher", required: "Place of Publisher is required", placeholder: "Enter Place of Publisher" },
    { label: "Editor Name", type:"text", name: "editor_name", required: "Editor Name is required", placeholder: "Enter Editor Name" }
  ];

 export const Subscription_details = [
    { label: "Subscription Price", type:'number', name: "subscription_price", required: "Subscription Price is required", placeholder: "Enter Subscription Price" },
    { label: "Subscription Start Date", type:'date', name: "subscription_start_date", required: "Start Date is required", placeholder: "Enter Subscription Start Date" },
    { label: "Subscription End Date", type:'date', name: "subscription_end_date", required: "End Date is required", placeholder: "Enter Subscription End Date" }
  ];

 export const Volume = [
    { label: "Volume No.", type:'number', name: "volume_number", required: "Volume No. is required", placeholder: "Enter Volume No." },
    { label: "Issue No.", type:'number', name: "issue_number", required: "Issue No. is required", placeholder: "Enter Issue No." },
  ];


 export const Publication = [
    { label: "Frequency", type:'number', name: "frequency", required: "Frequency is required", placeholder: "Enter Frequency" },
    { label: "Item Type", type:'text', name: "item_type", required: "Item Type is required", placeholder: "Enter Item Type" },
    { label: "ISSN",type:'text', name: "issn", required: "ISSN is required", placeholder: "Enter ISSN" },
    { label: "Call Number", type:'text', name: "call_number", required: "Call Number is required", placeholder: "Enter Call Number" },
  ];

 export const Library_info = [
    { label: "Vendor Name", type:"text", name: "vendor_name", required: "Vendor Name is required", placeholder: "Enter Vendor Name" },
    { label: "Library Name", type:"text", name: "library_name", required: "Library Name is required", placeholder: "Enter Library Name" },
  ];