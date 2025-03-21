import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "../ui/button";
import { BookData } from "@/app/book-pages/types/data";


interface ExportBookProps {
  data: BookData[];
}

const ExportBook: React.FC<ExportBookProps> = ({ data }) => {
  const exportToPDF = () => {
    if (!data || data.length === 0) {
      alert("No data available to export!");
      return;
    }

    const doc = new jsPDF();
    const tableColumn = [
      "Book ID",
      "Book Name",
      "Author",
      "Publisher",
      "Available Count",
      "ISBN",
      "Year of Publication",
    ];

    const tableRows = data.map((book) => [
      book.book_title_id,
      book.book_title,
      book.book_author,
      book.name_of_publisher,
      book.available_count,
      book.isbn,
      book.year_of_publication,
    ]);

    // Add title
    doc.text("Book Data Report", 14, 15);

    // Add table
    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    // Save the PDF
    doc.save("Book_Report.pdf");
  };

  return (
    <Button onClick={exportToPDF} className="mt-4">
      Export to PDF
    </Button>
  );
};

export default ExportBook;
