export default function Progress({ numQuetions, index, points, maxPoints }) {
  return (
    <header className="progress">
      <progress max={numQuetions} value={index + 1} />
      <p>
        Question <strong>{index + 1}</strong> /<strong>{numQuetions}</strong>
      </p>

      <p>
        <strong>{points}</strong> /<strong>{maxPoints}</strong>
      </p>
    </header>
  );
}
