import { useEffect, useState } from "react";
import "./App.css";
import useSudoku from "./hooks/useSudoku";
import Sudoku from "./components/Sudoku";
import { flattenDeep, isEqual } from "lodash";
import { DIFFICULTY_MODES } from "./utils/constants";
import { DIFFICULTY } from "./model/sudoku";

function App() {
  const { board, solution, generateSudoku } = useSudoku();

  const [userSolution, setSolution] = useState<number[][]>([]);
  const [enableCheckOption, setCheckOption] = useState<boolean>(false);
  const [hasErrors, setHasErrorStatus] = useState<boolean>(false);
  const [isCorrectSolution, setCorrectSolutionStatus] =
    useState<boolean>(false);
  const [currentMode, setMode] = useState<DIFFICULTY>("EASY");

  useEffect(() => {
    setCheckOption(false);
    setCorrectSolutionStatus(false);
    setHasErrorStatus(false);
    generateSudoku(currentMode);
  }, [currentMode]);

  const handleSudokuComplete = (currentBoard: number[][]) => {
    setSolution(currentBoard);
    setCheckOption(true);
  };

  const handleVerify = () => {
    if (!userSolution.length) return;
    const isCorrectSoluton = isEqual(
      flattenDeep([...solution]),
      flattenDeep([...userSolution])
    );

    if (!isCorrectSoluton) setHasErrorStatus(true);
    else setCorrectSolutionStatus(true);
  };
  const handleRetry = () => {
    setCheckOption(false);
    setCorrectSolutionStatus(false);
    setHasErrorStatus(false);
    generateSudoku();
  };

  const handleModeSelected = (mode: DIFFICULTY) => {
    setMode(mode);
  };

  return (
    <main className="App">
      <h2 className="title">Sudoku</h2>
      <nav className="modes-nav">
        {Object.keys(DIFFICULTY_MODES).map((mode, index) => (
          <li key={`modes-${index}`} className="modes-nav-item">
            <button
              className={`mode-nav-item-selector ${
                mode === currentMode && "mode-nav-item-selector_active"
              }`}
              onClick={() => {
                handleModeSelected(mode as DIFFICULTY);
              }}
            >
              {mode}
            </button>
          </li>
        ))}
      </nav>
      <Sudoku
        board={board}
        solution={solution}
        showErrors={hasErrors}
        onSudokuBoardCompleted={handleSudokuComplete}
      />
      {enableCheckOption && !hasErrors && !isCorrectSolution && (
        <button onClick={handleVerify}>Verify your solution?</button>
      )}

      {isCorrectSolution && (
        <button onClick={handleRetry}>
          🎉 Yay!! Correct Solution. Try again?
        </button>
      )}

      {hasErrors && (
        <button onClick={handleRetry}>
          😔 Oops!!! Incorrect Solution! Try with another board?
        </button>
      )}

      <article className="footer">MADE WITH ❤️ • VAISAKH R KRISHNAN </article>
    </main>
  );
}

export default App;
