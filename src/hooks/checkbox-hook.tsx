import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { setShow } from "@/redux/selectAllSlice";
import { RootState } from "@/redux/store/store";
export function useRowSelection<T>(
  getRowId: (row: T) => string | number,
  isSelectable: boolean,
  columns: ColumnDef<T>[],
  tableData: T[],
  priorColumns?: ColumnDef<T>[]
) {
  const dispatch = useDispatch();
  const [selectedData, setSelectedData] = useState<T[]>([]);
  // const { show } = useSelector((state: RootState) => state.selectAll);

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
              onChange={(e) => {
                toggleAllRows(e.target.checked, tableData)
                e.target.checked ? dispatch(setShow(true)) : dispatch(setShow(false))
              }
              }
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="ml-4 mr-2">
            <input
              type="checkbox"
              checked={isRowSelected(row.original)}
              onChange={(e) => {
                if (!e.target.checked) {
                  dispatch(setShow(false))
                }
                toggleRowSelection(row.original)
              }}
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
