import { useEffect, useReducer } from 'react';
import Header from './Header';
import Loader from './Loader';
import Error from './Error';
import Main from './Main';
import StartScreen from './StartScreen';
import Question from './Question';

const initialState = {
  questions: [],
  // loading, ready, error, active, pendding, ...
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
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
    default:
      throw new Error('Unknown action');
  }
}

export default function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuetions = questions.length;
  const question = questions[index];

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
          <StartScreen numQuetions={numQuetions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <Question answer={answer} question={question} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}
