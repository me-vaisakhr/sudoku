import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useSudoku from "./hooks/useSudoku";
import Grid from "./components/Grid";

function App() {
  const { board, generateSudoku } = useSudoku();

  useEffect(() => {
    generateSudoku();
  }, []);

  return (
    <main className="App">
      <table className="sudoku-grid">
        <tbody>
          {board.map((rows, rowIndex) => {
            return (
              <tr key={`grid-row-${rowIndex}`} className="parentRow">
                {rows.map((col, colIndex) => {
                  return (
                    <td className="childColumn" key={`grid-col-${rowIndex}-${colIndex}`}>
                      <Grid>
                        {col !== 0 && col}
                      </Grid>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

export default App;
