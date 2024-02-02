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
    default:
      throw new Error('Unknown action');
  }
}

export default function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
  const numQuetions = questions.length;
  useEffect(function () {
    fetch('http://localhost:9000/questions')
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
        {status === 'active' && <Question />}
        {/* <p>1/15</p>
        <p>Question?</p> */}
      </Main>
    </div>
  );
}
