import { useEffect, useState } from "react";
import "./App.css";
import useSudoku from "./hooks/useSudoku";
import Sudoku from "./components/Sudoku";
import { flattenDeep, isEqual } from "lodash";

function App() {
  const { board, solution, generateSudoku } = useSudoku();

  const [userSolution, setSolution] = useState<number[][]>([]);
  const [enableCheckOption, setCheckOption] = useState<boolean>(false);
  const [hasErrors, setHasErrorStatus] = useState<boolean>(false);
  const [isCorrectSolution, setCorrectSolutionStatus] =
    useState<boolean>(false);

  useEffect(() => {
    setCheckOption(false);
    setCorrectSolutionStatus(false);
    setHasErrorStatus(false);
    generateSudoku();
  }, []);

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


  return (
    <main className="App">
      <h2 className="title">Sudoku</h2>
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
        <button onClick={handleRetry}>🎉 Yay!! Correct Solution. Try again?</button>
      )}

      {hasErrors && (
        <button onClick={handleRetry}>😔 Oops!!! Incorrect Solution! Try with another board?</button>
      )}
    </main>
  );
}

export default App;
