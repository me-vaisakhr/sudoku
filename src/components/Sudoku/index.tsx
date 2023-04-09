import { flattenDeep, uniq } from "lodash";
import React, { FC, useEffect, useState } from "react";
import { BoardItem as BoardItemProps } from "../../model/sudoku";
import { SUDOKU_MAX_COLS, SUDOKU_MAX_ROWS } from "../../utils/constants";
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
  const [focusedCoords, setFocusCoords] = useState<string[]>([]);

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

  const generateFoucusedNeighbours = (row: number, column: number) => {
    let neighbours = [];
    //row coords
    for (let i = 0; i < SUDOKU_MAX_ROWS; i++) {
      neighbours.push(`${row}, ${i}`);
    }

    //col cords
    for (let i = 0; i < SUDOKU_MAX_COLS; i++) {
      neighbours.push(`${i}, ${column}`);
    }

    //subgrid coords
    const rowInSmallMatrix = row % Math.sqrt(SUDOKU_MAX_ROWS);
    const colInSmallMatrix = column % Math.sqrt(SUDOKU_MAX_COLS);
    const startingRow = row - rowInSmallMatrix;
    const startingCol = column - colInSmallMatrix;
    const endingRow = startingRow + (Math.sqrt(SUDOKU_MAX_ROWS) - 1);
    const endingCol = startingCol + (Math.sqrt(SUDOKU_MAX_COLS) - 1);

    for (let i = startingRow; i <= endingRow; i++)
      for (let j = startingCol; j <= endingCol; j++)
        neighbours.push(`${i}, ${j}`);

    return uniq([...neighbours]);
  };

  const handleFocusNeighbours = (row: number, column: number) => {
    setFocusCoords(generateFoucusedNeighbours(row, column));
  };

  const handleBlurNeighbours = (row: number, column: number) => {
    setFocusCoords([]);
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
                    <BoardItem
                      value={col.value}
                      row={rowIndex}
                      column={colIndex}
                      isFocused={focusedCoords.includes(`${rowIndex}, ${colIndex}`)}
                      correctValue={solution[rowIndex][colIndex] || 0}
                      isEditable={col.isEditable}
                      isError={col.isError}
                      onFocus={handleFocusNeighbours}
                      onBlur={handleBlurNeighbours}
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
