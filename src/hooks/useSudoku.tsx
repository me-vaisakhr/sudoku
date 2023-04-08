import React, { useState } from "react";
import { Sudoku } from "../lib/Sudoku";
import { DIFFICULTY } from "../model/sudoku";
import { DIFFICULTY_MODES } from "../utils/constants";
import { flattenDeep } from "lodash";

const MAX_ROW = 9;
const MAX_COL = 9;
const useSudoku = () => {
  const INITIAL_SUDOKU_GRID = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const [solution, setSolution] = useState<number[][]>(INITIAL_SUDOKU_GRID);
  const [board, setBoard] = useState<number[][]>([]);

  const generateSudoku = (mode: DIFFICULTY = "EASY") => {
    const sudoku = new Sudoku();
    const sudokuSolution = sudoku.generate(INITIAL_SUDOKU_GRID);
    setSolution(sudokuSolution);
    setBoard(sudoku.generateBoard(sudokuSolution, DIFFICULTY_MODES[mode]));

    console.info("SOLUTION => ", sudokuSolution);
    console.info("BOARD => ", board);
  };

  return { board, generateSudoku };
};

export default useSudoku;
