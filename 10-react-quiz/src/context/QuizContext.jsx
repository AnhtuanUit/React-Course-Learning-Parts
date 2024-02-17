import { createContext, useContext, useEffect, useReducer } from 'react';

const QuizContext = createContext();

const SECONDS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // loading, ready, error, active, finish, ...
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
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
      return {
        ...state,
        status: 'active',
        secondsRemaining: SECONDS_PER_QUESTION * state.questions.length,
      };
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
    case 'finished':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.highscore < state.points ? state.points : state.highscore,
      };
    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
        highscore: state.highscore,
      };
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };
    default:
      throw new Error('Unknown action');
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

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
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        dispatch,
        numQuestions,
        question,
        maxPoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error('QuizContext was used outside of QuizProvider');
  return context;
}

export { QuizProvider, useQuiz };
