export default function Progress({
  numQuestions,
  index,
  points,
  maxPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={answer === null ? index : index + 1}
      />
      <p>
        Question <strong>{index + 1}</strong> /<strong>{numQuestions}</strong>
      </p>

      <p>
        <strong>{points}</strong> /<strong>{maxPoints}</strong>
      </p>
    </header>
  );
}
