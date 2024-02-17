import { useQuiz } from '../context/QuizContext';

export default function Progress() {
  const { numQuestions, index, points, maxPoints, answer } = useQuiz();
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
