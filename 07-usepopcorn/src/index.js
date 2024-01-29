import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import StarRating from './StarRating';
import { useState } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Test() {
  const defaultRating = 2;
  const [rating, setRating] = useState(defaultRating);
  return (
    <div>
      <label>Test RatingStar</label>
      <StarRating
        color="red"
        size={30}
        messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
        onSetRating={setRating}
        defaultRating={defaultRating}
      />
      <p>This movie was rated {rating} stars</p>
      <p>--------------------</p>
    </div>
  );
}

root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Test />
    <StarRating
      color="black"
      size={30}
      messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
      defaultRating={2}
    />
  </React.StrictMode>
);
