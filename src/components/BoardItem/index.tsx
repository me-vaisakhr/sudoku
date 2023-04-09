import React, {
  ChangeEvent,
  FC,
  memo,
  PropsWithChildren,
  useState,
} from "react";
import { BoardItem as BoardProps } from "../../model/sudoku";
import "./index.css";

interface BoardItemProps extends BoardProps {
  row: number;
  column: number;
  onEdit?: (value: number, row: number, column: number) => void;
}

const BoardItem: FC<PropsWithChildren<BoardItemProps>> = ({
  row,
  column,
  value,
  isEditable,
  isError,
  onEdit,
}) => {
  const [editEnabled, setEditable] = useState<boolean>(false);
  const [editedValue, setEditedValue] = useState<number>(0);

  const handleEditField = () => {
    if (isError) return;
    if (!isEditable) return;
    setEditable(true);
  };

  const handleRemoveEdit = () => {
    setEditable(false);
  };

  const handleOutOfFocus = () => {
    if (!isEditable) return;
    const newValue = editedValue === 0 ? value : editedValue;
    handleRemoveEdit();
    setEditedValue(0);

    onEdit?.(newValue, row, column);
  };

  const handleEditValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isEditable) return;
    setEditedValue(Number(e.target.value));
  };

  return (
    <div
      className={`grid-item ${isEditable && !editEnabled && "editable"} ${
        editEnabled && "editable-enabled"
      } ${isError && "error"}`}
      onClick={handleEditField}
    >
      {editEnabled ? (
        <input
          autoFocus
          type="number"
          maxLength={1}
          onChange={handleEditValueChange}
          onBlur={handleOutOfFocus}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleOutOfFocus();
            }
          }}
          pattern="[1-9]"
          className="text-box"
        />
      ) : (
        <div>{value !== 0 ? value : "  "}</div>
      )}
    </div>
  );
};

export default memo(BoardItem);
