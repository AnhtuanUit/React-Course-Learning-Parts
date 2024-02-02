import { useEffect, useReducer } from 'react';
import Header from './Header';
import Loader from './Loader';
import Error from './Error';
import Main from './Main';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';

const initialState = {
  questions: [],
  // loading, ready, error, active, finish, ...
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataRecieved':
      return {
        ...state,
        status: 'ready',
        questions: action.payload,
      };
    case 'dataFailed':
      return { ...state, status: 'error', questions: [] };
    case 'start':
      return { ...state, status: 'active' };
    case 'answer':
      const { correctOption, points } = state.questions[state.index];
      const answer = action.payload;

      return {
        ...state,
        answer,
        points: correctOption === answer ? state.points + points : state.points,
      };
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'finish':
      return {
        ...state,
        status: 'finish',
        highscore:
          state.highscore < state.points ? state.points : state.highscore,
      };
    default:
      throw new Error('Unknown action');
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const question = questions[index];
  const maxPoints = questions.reduce((sum, curr) => sum + curr.points, 0);

  useEffect(function () {
    fetch(`${process.env.REACT_APP_BASE_URL}questions`)
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataRecieved', payload: data }))
      .catch(() => dispatch({ type: 'dataFailed' }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              maxPoints={maxPoints}
              index={index}
              points={points}
              numQuestions={numQuestions}
              answer={answer}
            />
            <Question answer={answer} question={question} dispatch={dispatch} />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              numQuestions={numQuestions}
              index={index}
            />
          </>
        )}
        {status === 'finish' && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}
