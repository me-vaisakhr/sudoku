import { flattenDeep } from "lodash";
import React, { FC, useEffect, useState } from "react";
import { BoardItem as BoardItemProps } from "../../model/sudoku";
import BoardItem from "../BoardItem";
import "./sudoku.css";

interface SudokuProps {
  board: number[][];
  solution: number[][];
  showErrors?: boolean;
  onSudokuBoardCompleted?: (currentBoard: number[][]) => void;
}

const Sudoku: FC<SudokuProps> = ({
  board,
  solution,
  showErrors,
  onSudokuBoardCompleted,
}) => {
  const [normalizedBoard, setNormalizedBoard] = useState<BoardItemProps[][]>(
    []
  );

  const getNormalizedBoard = (
    withError?: boolean
  ): BoardItemProps[][] | undefined => {
    if (
      withError &&
      (!showErrors || !normalizedBoard.length || !solution.length)
    )
      return;

    return board.map((rows, rIndex) => {
      return rows.map((item, cIndex) => {
        return {
          value:
            showErrors && withError
              ? normalizedBoard[rIndex][cIndex].value
              : item,
          isEditable: item === 0,
          isError:
            showErrors &&
            withError &&
            solution[rIndex][cIndex] !== normalizedBoard[rIndex][cIndex].value
              ? true
              : false,
        };
      });
    });
  };

  useEffect(() => {
    if (!board || !board.length) return;

    const normalized = getNormalizedBoard(false);
    if (!normalized) return;
    setNormalizedBoard(normalized);
  }, [board]);

  useEffect(() => {
    if (!showErrors) return;
    const normalizedWithError = getNormalizedBoard(true);
    if (!normalizedWithError) return;
    setNormalizedBoard(normalizedWithError);
  }, [showErrors]);

  const handleUpdateBoard = (value: number, row: number, column: number) => {
    let currentBoard = [...normalizedBoard];
    currentBoard[row][column].value = value;
    setNormalizedBoard([...currentBoard]);
  };

  const isCompleted = flattenDeep(normalizedBoard).every(
    (element: BoardItemProps) => element.value !== 0
  );

  const getDenormalizeBoard = (): number[][] => {
    let deNormalizedBoard: number[][] = [];

    for (let i = 0; i < normalizedBoard.length; i++) {
      deNormalizedBoard[i] = [];
      for (let j = 0; j < normalizedBoard.length; j++) {
        deNormalizedBoard[i][j] = 0;
      }
    }

    for (let i = 0; i < normalizedBoard.length; i++)
      for (let j = 0; j < normalizedBoard.length; j++) {
        deNormalizedBoard[i][j] = normalizedBoard[i][j].value;
      }

    return deNormalizedBoard;
  };

  useEffect(() => {
    if (!isCompleted) return;

    onSudokuBoardCompleted?.(getDenormalizeBoard());
  }, [isCompleted, normalizedBoard]);

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
                    <BoardItem
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
