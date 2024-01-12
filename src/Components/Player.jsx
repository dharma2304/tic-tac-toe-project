import { useState } from "react";

export default function Player({ name, symbol, isActive, nameChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  function handleEdit() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      nameChange(symbol, playerName);
    }
  }

  function handleOnChange(event) {
    console.log(event);
    setPlayerName(event.target.value);
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{playerName}</span>
        ) : (
          <input
            type="text"
            name="playerName"
            required
            defaultValue={playerName}
            onChange={handleOnChange}
          />
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
