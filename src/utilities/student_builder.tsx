import { StudentData, StudentFromDatabase } from "@/types/student";

export class StudentDataBuilder {
  private studentEntry: Partial<StudentFromDatabase> = {};

  constructor(
    private rowOrData: any,
    private mapping: Record<string, string> = {},
    private excelHeaders: string[] = []
  ) {}

  setField(fieldKey: keyof StudentFromDatabase, transform?: (value: any) => any) {
    if (Array.isArray(this.rowOrData)) {
      // Excel row mode
      const column = this.mapping[fieldKey];
      const colIndex = this.excelHeaders.indexOf(column);

      console.log({ column, colIndex });

      if (column && colIndex !== -1 && this.rowOrData[colIndex] !== undefined) {
        let value = this.rowOrData[colIndex];
        if (transform) value = transform(value);
        this.studentEntry[fieldKey] = value;
      }
    } else if (typeof this.rowOrData === "object") {
      // Direct data mode
      let value = this.rowOrData[fieldKey];
      if (transform) value = transform(value);
      this.studentEntry[fieldKey] = value;
    }

    return this;
  }

  build(): Partial<StudentFromDatabase> {
    return this.studentEntry;
  }
}
