import { shuffle } from "lodash";
import { SUDOKU_MAX_COLS, SUDOKU_MAX_ROWS, SUDOKU_VALUES } from "./constants";
export class Sudoku {
  private readonly POSSIBLE_VALUES: number[] = SUDOKU_VALUES;
  private readonly MAX_ROWS = SUDOKU_MAX_ROWS;
  private readonly MAX_COLS = SUDOKU_MAX_COLS;
  private grid: number[][] = [];

  private getRandomNumberFromList(list: any[]) {
    return list[Math.floor(Math.random() * list.length)];
  }

  private getCellRow(index: number, rowLength: number = this.MAX_ROWS) {
    return Math.floor(index / rowLength);
  }

  private getCellCol(index: number, colLength: number = this.MAX_COLS) {
    return index % colLength;
  }

  private isPresentInColumn(
    grid: number[][],
    column: number,
    value: number
  ): boolean {
    for (let i = 0; i < this.MAX_COLS; i++)
      if (grid[i][column] === value) return true;
    return false;
  }

  private isPresentInRow(
    grid: number[][],
    row: number,
    value: number
  ): boolean {
    return grid[row].includes(value);
  }

  private isPresentInSubGrid(
    grid: number[][],
    row: number,
    column: number,
    value: number
  ): boolean {
    const rowInSmallMatrix = row % Math.sqrt(this.MAX_ROWS);
    const colInSmallMatrix = column % Math.sqrt(this.MAX_COLS);
    const startingRow = row - rowInSmallMatrix;
    const startingCol = column - colInSmallMatrix;
    const endingRow = startingRow + (Math.sqrt(this.MAX_ROWS) - 1);
    const endingCol = startingCol + (Math.sqrt(this.MAX_COLS) - 1);

    for (let i = startingRow; i <= endingRow; i++)
      for (let j = startingCol; j <= endingCol; j++)
        if (grid[i][j] === value) return true;
    return false;
  }

  private isPossibleFit(
    grid: number[][],
    row: number,
    column: number,
    value: number
  ) {
    return (
      !this.isPresentInColumn(grid, column, value) &&
      !this.isPresentInRow(grid, row, value) &&
      !this.isPresentInSubGrid(grid, row, column, value)
    );
  }

  private createSudoku(row: number = 0, column: number = 0): boolean {
    if (row === this.MAX_ROWS) return true;
    else if (column === this.MAX_COLS) return this.createSudoku(row + 1, 0);
    else if (this.grid[row][column] !== 0)
      return this.createSudoku(row, column + 1);
    else {
      const shuffledPossibleList = shuffle(this.POSSIBLE_VALUES);
      for (let k = 0; k < shuffledPossibleList.length; k++) {
        const value = shuffledPossibleList[k];
        if (this.isPossibleFit(this.grid, row, column, value)) {
          this.grid[row][column] = value;
          if (this.createSudoku(row, column + 1)) return true;
          this.grid[row][column] = 0;
        }
      }
      return false;
    }
  }

  public generate(initialData: number[][] = []) {
    if (!initialData.length) console.error("PROVIDE INITIAL DATA");
    this.grid = initialData;
    this.createSudoku();
    return this.grid;
  }

  public generateBoard(
    solution: number[][] = [],
    difficulty: number
  ): number[][] {
    if (!solution.length) console.error("BAD SOLUTION RECEIVED!!!");
    let removeCount = difficulty;
    let board = solution;
    let list = Array(this.MAX_ROWS * this.MAX_COLS)
      .fill(0)
      .map((_, index) => index);
    while (removeCount >= 0) {
      const randomIndex = this.getRandomNumberFromList(list);
      board[this.getCellRow(randomIndex)][this.getCellCol(randomIndex)] = 0;
      list.splice(list.indexOf(randomIndex), 1);
      removeCount--;
    }

    return board;
  }
}
