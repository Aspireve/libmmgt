import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

export function useRowSelection<T>(
  getRowId: (row: T) => string | number,
  isSelectable: boolean,
  columns: ColumnDef<T>[],
  tableData: T[],
  priorColumns?: ColumnDef<T>[]
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
          <div className="ml-4 mr-2">
            <input
              type="checkbox"
              checked={
                selectedData.length === tableData?.length &&
                (tableData?.length || 0) > 0
              }
              onChange={(e) => toggleAllRows(e.target.checked, tableData)}
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="ml-4 mr-2">
            <input
              type="checkbox"
              checked={isRowSelected(row.original)}
              onChange={() => toggleRowSelection(row.original)}
            />
          </div>
        ),
      },
      ...columns,
    ]
    : columns;
  const columnsWithPrior =
    priorColumns && priorColumns.length > 0
      ? [...priorColumns, ...columnsWithCheckbox]
      : columnsWithCheckbox;

  return {
    selectedData,
    columnsWithCheckbox,
    isRowSelected,
    toggleRowSelection,
    toggleAllRows,
    setSelectedData,
    columnsWithPrior,
  };
}
