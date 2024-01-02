import Player from "./Components/Player.jsx";
import GameBoard from "./Components/GameBoard.jsx";
import { useState } from "react";
function App() {
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectPlayer() {
    setActivePlayer((currPlayer) => (currPlayer === "X" ? "O" : "X"));
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        <GameBoard
          onSelectPlayer={handleSelectPlayer}
          activePlayerSymbol={activePlayer}
        />
      </div>
    </main>
  );
}

export default App;
