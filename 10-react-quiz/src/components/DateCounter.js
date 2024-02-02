import { useReducer } from 'react';

const initialState = { count: 0, step: 1 };
function reducer(state, action) {
  const { count, step } = state;

  switch (action.type) {
    case 'dec':
      return { ...state, count: count - step };
    case 'inc':
      return { ...state, count: count + step };
    case 'setCount':
      return { ...state, count: action.payload };
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return initialState;
    default:
      throw new Error('Unknown action');
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  // const dec = function () {
  //   dispatch({ type: 'dec' });

  //   // setCount((count) => count - 1);
  //   // setCount(count => count - step);
  // };

  // const inc = function () {
  //   dispatch({ type: 'inc' });
  //   // setCount((count) => count + 1);
  //   // setCount(count => count + step);
  // };

  // const defineCount = function (e) {
  //   dispatch({ type: 'setCount', payload: +e.target.value });
  //   // setCount(Number(e.target.value));
  // };

  // const defineStep = function (e) {
  //   // setStep(Number(e.target.value));
  //   dispatch({ type: 'setStep', payload: +e.target.value });
  // };

  // const reset = function () {
  //   // setCount(0);
  //   // setStep(1);
  //   dispatch({ type: 'reset' });
  // };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={e =>
            dispatch({ type: 'setStep', payload: +e.target.value })
          }
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={() => dispatch({ type: 'dec' })}>-</button>
        <input
          value={count}
          onChange={e =>
            dispatch({ type: 'setCount', payload: +e.target.value })
          }
        />
        <button onClick={() => dispatch({ type: 'inc' })}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
