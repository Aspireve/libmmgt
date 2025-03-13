import * as XLSX from "xlsx";

export class FileProcessor {
  static getProcessor(fileType: string): FileProcessor {
    if (fileType.includes("csv")) {
      return new CSVProcessor();
    }
    return new ExcelProcessor();
  }

  process(data: ArrayBuffer): { headers: string[]; data: any[] } {
    throw new Error("process method must be implemented.");
  }
}

class ExcelProcessor extends FileProcessor {
  process(data: ArrayBuffer) {
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[];
    return { headers: jsonData[0] || [], data: jsonData.slice(1) };
  }
}

class CSVProcessor extends FileProcessor {
  process(data: ArrayBuffer) {
    const text = new TextDecoder("utf-8").decode(data);
    const rows = text.split("\n").map((row) => row.split(","));
    return { headers: rows[0] || [], data: rows.slice(1) };
  }
}
