import React, { useState } from "react";
import { Sudoku } from "../lib/Sudoku";
import { DIFFICULTY } from "../model/sudoku";
import { DIFFICULTY_MODES } from "../utils/constants";
import { cloneDeep, flattenDeep } from "lodash";

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
    setSolution(INITIAL_SUDOKU_GRID);
    setBoard(INITIAL_SUDOKU_GRID);
    const sudoku = new Sudoku();
    const generatedSolution = sudoku.generate(INITIAL_SUDOKU_GRID);
    setSolution(cloneDeep(generatedSolution));
    setBoard(cloneDeep(sudoku.generateBoard(generatedSolution, DIFFICULTY_MODES[mode])));
  };

  return { board, solution, generateSudoku };
};

export default useSudoku;
