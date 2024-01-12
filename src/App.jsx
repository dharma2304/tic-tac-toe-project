import Player from "./Components/Player.jsx";
import GameBoard from "./Components/GameBoard.jsx";
import Log from "./Components/Log.jsx";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./WinningCombinations.jsx";
import GameOver from "./Components/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function extractActivePlayer(gameTurns) {
  let currPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currPlayer = "O";
  }
  return currPlayer;
}

function App() {
  // const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  const activePlayer = extractActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  let winner;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].col];

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = players[firstSymbol];
    }
  }

  let matchDraw = gameTurns.length === 9 && !winner;

  function handleSelectPlayer(rowIndex, colIndex) {
    setGameTurns((prevGameTurns) => {
      const currPlayer = extractActivePlayer(prevGameTurns);
      const updatedGameTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currPlayer },
        ...prevGameTurns,
      ];

      return updatedGameTurns;
    });
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayers(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player1"
            symbol="X"
            isActive={activePlayer === "X"}
            nameChange={handlePlayers}
          />
          <Player
            name="Player2"
            symbol="O"
            isActive={activePlayer === "O"}
            nameChange={handlePlayers}
          />
        </ol>
        {(winner || matchDraw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}
        <GameBoard onSelectPlayer={handleSelectPlayer} gameBoard={gameBoard} />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;
