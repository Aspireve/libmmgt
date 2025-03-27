export interface JournalData {
    journal_copy_uuid:string;
    journal_uuid: string;
    journal_title_id: string;
    journal_title: string;
    editor_name: string;
    name_of_publisher: string;
    place_of_publication: string;
    subscription_id:string;
    subscription_price:string;
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
    category:string;
    issue_number:string;
    frequency:string;
    vendor_name:string;
    library_name:string;
    created_at: string;
    updated_at: string;
    error:string;
    title_images:[];
    title_additional_fields:{};
    title_description:string,

}
