import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

export function useRowSelection<T>(
  getRowId: (row: T) => string | number,
  isSelectable: boolean,
  columns: ColumnDef<T>[],
  tableData: T[]
) {
  const [selectedData, setSelectedData] = useState<T[]>([]);

  const isRowSelected = (row: T): boolean => {
    const rowId = getRowId(row);
    return selectedData.some((selected) => getRowId(selected) === rowId);
  };

  const toggleRowSelection = (row: T): void => {
    setSelectedData((prev) =>
      isRowSelected(row)
        ? prev.filter((selected) => getRowId(selected) !== getRowId(row))
        : [...prev, row]
    );
  };

  const toggleAllRows = (isChecked: boolean, listData: T[]): void => {
    setSelectedData(isChecked ? [...listData] : []);
  };

  const columnsWithCheckbox: ColumnDef<T>[] = isSelectable
    ? [
        {
          id: "select",
          header: () => (
            <input
              type="checkbox"
              checked={
                selectedData.length === tableData?.length &&
                (tableData?.length || 0) > 0
              }
              onChange={(e) => toggleAllRows(e.target.checked, tableData)}
            />
          ),
          cell: ({ row }) => (
            <input
              type="checkbox"
              checked={isRowSelected(row.original)}
              onChange={() => toggleRowSelection(row.original)}
            />
          ),
        },
        ...columns,
      ]
    : columns;

  return {
    selectedData,
    columnsWithCheckbox,
    isRowSelected,
    toggleRowSelection,
    toggleAllRows,
    setSelectedData,
  };
}
