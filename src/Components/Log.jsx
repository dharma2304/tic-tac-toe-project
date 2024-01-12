export default function Log({ gameTurns }) {
  return (
    <ol id="log">
      {gameTurns.map((turn, rowIndex) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected {turn.square.row}, {turn.square.col}
        </li>
      ))}
    </ol>
  );
}
