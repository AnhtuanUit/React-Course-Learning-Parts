// import React from 'react';
import './index.css';

const messages = [
  'Learn React 🎓!',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

export default function App() {
  const step = 1;
  function handlePrevious() {
    console.log('Previous');
  }
  function handleNext() {
    console.log('Next');
  }
  return (
    <div className="steps">
      <div className="numbers">
        <div className={`${step >= 1 ? 'active' : ''}`}>1</div>
        <div className={`${step >= 2 ? 'active' : ''}`}>2</div>
        <div className={`${step >= 3 ? 'active' : ''}`}>3</div>
      </div>
      <p className="message">
        Step {step}: {messages[step - 1]}
      </p>
      <div className="buttons">
        <button
          style={{ backgroundColor: 'blue', color: '#fff' }}
          onClick={handlePrevious}
        >
          Previous
        </button>

        <button
          style={{ backgroundColor: 'blue', color: '#fff' }}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
