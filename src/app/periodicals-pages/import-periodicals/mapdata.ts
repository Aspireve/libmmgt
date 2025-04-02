import { AddPeriodicalType } from '@/types/periodical';

export type MappingType = {
    [key in keyof AddPeriodicalType]?: string;
  };
export const initialMapping = {
  journal_title: "",
  name_of_publisher: "",
  place_of_publication: "",
  editor_name:"",
  subscription_id: "",
  subscription_price: "",
  subscription_start_date: "",
  subscription_end_date: "",
  volume_no: "",
  issue_number: "",
  frequency: "",
  item_type: "",
  issn: "",
  classification_number: "",
  vendor_name: "",
  library_name: "",
  category: "",
  barcode: ""
};

export const fieldLabels: Partial<Record<keyof AddPeriodicalType, string>> = {
  journal_title: "Journal Title",
  name_of_publisher: "Name of Publisher",
  place_of_publication: "Place of Publication",
  editor_name:"Editor Name",
  subscription_id: "Subscription Id",
  subscription_price:"Subscription Price",
  subscription_start_date:"Subscription Start Date",
  subscription_end_date:"Subscription End Date",
  volume_no:"Volume No",
  issue_number:"Issue Number",
  frequency:"Frequency",
  item_type:"Item Type",
  issn:"ISSN",
  classification_number:"Classification Number",
  vendor_name:"Vendor Name",
  library_name:"Library Name",
  category:"Category",
  barcode:"Barcode"
};
