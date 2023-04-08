import React, { FC, useEffect, useState } from "react";
import { BoardItem } from "../../model/sudoku";
import Grid from "../Grid";
import "./sudoku.css";

interface SudokuProps {
  board: number[][];
}

const Sudoku: FC<SudokuProps> = ({ board }) => {
  const [normalizedBoard, setNormalizedBoard] = useState<BoardItem[][]>([]);

  useEffect(() => {
    if (!board || !board.length) return;

    setNormalizedBoard(
      board.map((rows, rowIndex) => {
        return rows.map((item, colIndex) => {
          return {
            value: item,
            isEditable: item === 0,
          };
        });
      })
    );
  }, [board]);

  const handleUpdateBoard = (value: number, row: number, column: number) => {
    let currentBoard = [...normalizedBoard];
    currentBoard[row][column].value = value;
    setNormalizedBoard([...currentBoard]);
  };

  return (
    <table className="sudoku">
      <tbody className="sudoku-body">
        {normalizedBoard.map((rows, rowIndex) => {
          return (
            <tr key={`grid-row-${rowIndex}`} className="sudoku-body-rows">
              {rows.map((col, colIndex) => {
                return (
                  <td
                    className="sudoku-row-cols"
                    key={`grid-col-${rowIndex}-${colIndex}`}
                  >
                    <Grid
                      value={col.value}
                      row={rowIndex}
                      column={colIndex}
                      isEditable={col.isEditable}
                      isError={col.isError}
                      onEdit={handleUpdateBoard}
                    />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Sudoku;
