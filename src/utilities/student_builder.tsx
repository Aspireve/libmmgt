import { StudentData } from "@/types/student";


export class StudentDataBuilder {
  private studentEntry: Partial<StudentData> = {};

  constructor(
    private row: any,
    private mapping: Record<string, string>,
    private excelHeaders: string[]
  ) {}

  setField(fieldKey: keyof StudentData, transform?: (value: any) => any) {
    const column = this.mapping[fieldKey];
    const colIndex = this.excelHeaders.indexOf(column);

    if (column && colIndex !== -1 && this.row[colIndex] !== undefined) {
      let value = this.row[colIndex];
      if (transform) value = transform(value);
      this.studentEntry[fieldKey] = value;
    }

    return this;
  }

  build(): Partial<StudentData> {
    return this.studentEntry;
  }
}
