import React, {
  ChangeEvent,
  FC,
  memo,
  PropsWithChildren,
  useState,
} from "react";
import { BoardItem } from "../../model/sudoku";
import "./index.css";

interface GridProps extends BoardItem {
  row: number;
  column: number;
  onEdit?: (value: number, row: number, column: number) => void;
}

const Grid: FC<PropsWithChildren<GridProps>> = ({
  row,
  column,
  value,
  isEditable,
  isError,
  onEdit,
}) => {
  const [editEnabled, setEditable] = useState<boolean>(false);
  const [editedValue, setEditedValue] = useState<number>(-1);
  const handleEditField = () => {
    if (!isEditable) return;
    setEditable(true);
  };

  const handleRemoveEdit = () => {
    setEditable(false);
  };

  const handleBlur = () => {
    if (!isEditable) return;
    if (editedValue === -1) return;

    handleRemoveEdit();
    onEdit?.(editedValue, row, column);
    setEditedValue(-1);
  };

  const handleEditValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isEditable) return;
    setEditedValue(Number(e.target.value));
  };

  return (
    <div
      className={`grid-item ${isEditable && !editEnabled && "editable"} ${
        editEnabled && "editable-enabled"
      }`}
      onClick={handleEditField}
    >
      {editEnabled ? (
        <input
          autoFocus
          type="number"
          maxLength={1}
          onChange={handleEditValueChange}
          onBlur={handleBlur}
          pattern="[0-9]"
          className="text-box"
        />
      ) : (
        <div>{value !== 0 ? value : "  "}</div>
      )}
    </div>
  );
};

export default memo(Grid);
