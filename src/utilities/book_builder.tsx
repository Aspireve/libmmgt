import { BookData } from "@/app/book-pages/types/data";
import { AddBookType } from "@/types/book";

export class BookDataBuilder {
    private bookEntry: Partial<AddBookType> = {};

    constructor(
        private rowOrData: any,
        private mapping: Record<string, string> = {},
        private excelHeaders: string[] = []
    ) { }

    setField(fieldKey: keyof AddBookType, transform?: (value: any) => any) {
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
    setCustomField(fieldKey: string, value: any) {
        this.bookEntry[fieldKey as keyof AddBookType] = value;
        return this;
      }

    build(): AddBookType {
        return this.bookEntry as AddBookType;
    }
}


