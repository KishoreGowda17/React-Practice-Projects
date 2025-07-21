import { useState ,useEffect} from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";

function App() {

  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  function getGameBoard(turns) {
    const board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    for (const turn of turns) {
      const { row, col } = turn.square;
      board[row][col] = turn.player;
    }
    return board;
  }

  function checkWinner(board) {
    // Rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return board[i][0];
      }
    }
    // Columns
    for (let i = 0; i < 3; i++) {
      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return board[0][i];
      }
    }
    // Diagonals
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return board[0][0];
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return board[0][2];
    }
    return null;
  }

  function checkDraw(board) {
    return board.flat().every(cell => cell !== null);
  }

  function handleSelectSquare(rowIndex, colIndex) {
    if (winner || isDraw) return;
    const board = getGameBoard(gameTurns);
    if (board[rowIndex][colIndex]) return; // Prevent overwriting

    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      let currentPlayer = "X";
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
    setActivePlayer("X");
    setWinner(null);
    setIsDraw(false);
  }

  // Check for winner or draw after every turn
  useEffect(() => {
    const board = getGameBoard(gameTurns);
    const win = checkWinner(board);
    if (win) {
      setWinner(win);
      setIsDraw(false);
    } else if (checkDraw(board) && gameTurns.length > 0) {
      setWinner(null);
      setIsDraw(true);
    } else {
      setWinner(null);
      setIsDraw(false);
    }
  }, [gameTurns]);

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard onSelecSquare={handleSelectSquare} turns={gameTurns} />
        <div style={{ margin: '1rem 0' }}>
          {(winner || isDraw) && (
            <div className="game-status">
              {winner && <h2>Winner: {winner}</h2>}
              {isDraw && !winner && <h2>It's a Draw!</h2>}
              <button onClick={handleRestart}>Restart Game</button>
            </div>
          )}
        </div>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
