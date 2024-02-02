function FinishScreen({ points, maxPoints, highscore, dispatch }) {
  const percentage = (points / maxPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = '🥇';
  if (80 <= percentage && percentage < 100) emoji = '🎉';
  if (50 <= percentage && percentage < 80) emoji = '🙃';
  if (0 < percentage && percentage < 50) emoji = '🤨';
  if (percentage === 0) emoji = '🙇';

  return (
    <div>
      <p className="result">
        <span>{emoji}</span> You scored {points} out of {maxPoints} (
        {Math.ceil(percentage)} %)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default FinishScreen;
