import { useEffect } from "react";
import "./App.css";
import useSudoku from "./hooks/useSudoku";
import Sudoku from "./components/Sudoku";

function App() {
  const { board, generateSudoku } = useSudoku();

  useEffect(() => {
    generateSudoku();
  }, []);

  return (
    <main className="App">
      <Sudoku board={board} />
    </main>
  );
}

export default App;
