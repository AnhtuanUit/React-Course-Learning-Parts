import { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';

function Timer() {
  const { dispatch, secondsRemaining } = useQuiz();
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const timer = setInterval(function () {
        dispatch({ type: 'tick' });
      }, 1000);

      return () => {
        clearInterval(timer);
        // console.log('Unmount clear timer');
      };
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {`${mins}`.padStart(2, 0)}:{`${seconds}`.padStart(2, 0)}
    </div>
  );
}

export default Timer;
