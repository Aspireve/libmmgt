import { BookData } from "@/app/book-pages/types/data";

export class BookDataBuilder {
    private bookEntry: Partial<BookData> = {};

    constructor(
        private rowOrData: any,
        private mapping: Record<string, string> = {},
        private excelHeaders: string[] = []
    ) { }

    setField(fieldKey: keyof BookData, transform?: (value: any) => any) {
        if (Array.isArray(this.rowOrData)) {
            const column = this.mapping[fieldKey];
            const colIndex = this.excelHeaders.indexOf(column);

            if (column && colIndex !== -1 && this.rowOrData[colIndex] !== undefined) {
                let value = this.rowOrData[colIndex];
                if (transform) value = transform(value);
                this.bookEntry[fieldKey] = value;
            }
        } 
        else if (typeof this.rowOrData === "object") {
            let value = this.rowOrData[fieldKey];
            if (transform) value = transform(value);
            this.bookEntry[fieldKey] = value;
        }
        
        return this; 
    }

    build(): Partial<BookData> {
        return this.bookEntry;
    }
}


