function FinishScreen({ points, maxPoints, highscore }) {
  const percentage = (points / maxPoints) * 100;
  return (
    <div>
      <p className="result">
        You scored {points} out of {maxPoints} ({Math.ceil(percentage)} %)
      </p>
      <p className="highscore">Highscore {highscore} (points)</p>
    </div>
  );
}

export default FinishScreen;
