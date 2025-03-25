export interface JournalData {
    journal_uuid: string;
    journal_title_id: string;
    journal_title: string;
    editor_name: string;
    name_of_publisher: string;
    place_of_publication: string;
    subscription_price:string;  //TO ADD FROM BACKEND
    subscription_start_date: string;
    subscription_end_date: string;
    issn: string;
    volume_number: string;
    classification_number:string;
    is_archived: boolean;
    total_count: number;
    available_count: number;
    barcode:string;
    item_type:string;
    issue_no:string; //TO ADD FROM BACKEND
    frequency:string; //TO ADD FROM BACKEND
    vendor_name:string; //TO ADD FROM BACKEND
    library_name:string; //TO ADD FROM BACKEND
    created_at: string;
    updated_at: string;
}
