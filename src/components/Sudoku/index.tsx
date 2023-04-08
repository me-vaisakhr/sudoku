import React, { FC } from "react";
import Grid from "../Grid";
import "./sudoku.css"

interface SudokuProps{
    board:number[][]
}

const Sudoku:FC<SudokuProps> = ({board}) => {
  return (
    <table className="sudoku">
      <tbody className="sudoku-body">
        {board.map((rows, rowIndex) => {
          return (
            <tr key={`grid-row-${rowIndex}`} className="sudoku-body-rows">
              {rows.map((col, colIndex) => {
                return (
                  <td
                    className="sudoku-row-cols"
                    key={`grid-col-${rowIndex}-${colIndex}`}
                  >
                    <Grid>{col !== 0 && col}</Grid>
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
