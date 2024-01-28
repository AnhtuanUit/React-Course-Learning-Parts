import { useState } from 'react';
import './index.css';

const messages = [
  'Learn React 🎓!',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

export default function App() {
  return (
    <div>
      <Steps />
      <Steps />
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  function handlePrevious() {
    step > 1 && setStep(s => s - 1);
  }
  function handleNext() {
    step < 3 && setStep(s => s + 1);
  }
  return (
    <>
      <button className="close" onClick={e => setIsOpen(o => !o)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? 'active' : ''}>1</div>
            <div className={step >= 2 ? 'active' : ''}>2</div>
            <div className={step >= 3 ? 'active' : ''}>3</div>
          </div>
          <StepMessage>{messages[step - 1]}</StepMessage>
          <div className="buttons">
            <Button
              bgColor="#7950f2"
              onClick={handlePrevious}
              color="#fff"
              children
            >
              <span>👈</span> Previous
            </Button>
            <Button
              bgColor="#7950f2"
              onClick={handleNext}
              color="#fff"
              children
            >
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}:</h3>
      {children}
    </div>
  );
}

function Button({ bgColor, onClick, color, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: color }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
