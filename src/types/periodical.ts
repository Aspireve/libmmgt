export interface EditPeriodicalTitle {
    available_count: number
    category: string
    classification_number: string
    created_at: string
    frequency: string
    is_archived: boolean
    issue_number: string
    journal_title_id: string
    journal_uuid: string
    library_name: string
    name_of_publisher: string
    place_of_publication: string
    subscription_end_date: string
    subscription_id: string
    subscription_price: number
    subscription_start_date: string
    total_count: number
    updated_at: string
    vendor_name: string
    volume_no: string
}

export interface PeriodicalImportField {
    journal_title: string;
    name_of_publisher: string;
    place_of_publication: string;
    editor_name: string;
    subscription_id: string;
    subscription_price: string;
    subscription_start_date: string;
    subscription_end_date: string;
    volume_no: string,
    issue_number: string,
    frequency: string,
    item_type: string,
    issn: string,
    classification_number: string,
    vendor_name: string,
    library_name: string,
    category: string,
    barcode: string
}

export interface AddPeriodicalType extends PeriodicalImportField {
    institute_uuid: string;
    institute_name: string;
}