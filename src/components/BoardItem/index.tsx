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
  correctValue?: number;
  isFocused?: boolean;
  onFocus?: (row: number, column: number) => void;
  onBlur?: (row: number, column: number) => void;
  onEdit?: (value: number, row: number, column: number) => void;
}

const BoardItem: FC<PropsWithChildren<BoardItemProps>> = ({
  row,
  column,
  value,
  correctValue,
  isEditable,
  isFocused,
  isError,
  onEdit,
  onFocus,
  onBlur,
}) => {
  const [editEnabled, setEditable] = useState<boolean>(false);
  const [editedValue, setEditedValue] = useState<number>(0);

  const handleEditField = () => {
    if (isError) return;
    if (!isEditable) return;
    setEditable(true);
    onFocus?.(row, column);
  };

  const handleRemoveEdit = () => {
    setEditable(false);
    onBlur?.(row, column);
  };

  const handleOutOfFocus = () => {
    if (!isEditable) return;
    const newValue = editedValue === 0 ? value : editedValue;
    handleRemoveEdit();

    if (!isNaN(newValue)) {
      setEditedValue(0);
      onEdit?.(newValue, row, column);
    }
  };

  const handleEditValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isEditable) return;
    setEditedValue(Number(e.target.value));
  };

  return (
    <div
      className={`grid-item ${isEditable && !editEnabled && "editable"} ${
        editEnabled && "editable-enabled"
      } ${isError && "error"} ${isFocused && "focus"}`}
      onClick={handleEditField}
    >
      {editEnabled ? (
        <input
          value={editedValue || ""}
          autoFocus
          type="text"
          min={1}
          max={9}
          pattern="\d+"
          maxLength={1}
          onChange={handleEditValueChange}
          onBlur={handleOutOfFocus}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleOutOfFocus();
            }
          }}
          className="text-box"
        />
      ) : (
        <>
          <div>{value !== 0 ? value : "  "}</div>
          {isError && <sup className="correct-value">{correctValue}</sup>}
        </>
      )}
    </div>
  );
};

export default memo(BoardItem);
