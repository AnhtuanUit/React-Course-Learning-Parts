import { useQuiz } from '../context/QuizContext';

export default function StartScreen() {
  const { numQuetions, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuetions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'start' })}
      >
        Let's start
      </button>
    </div>
  );
}
