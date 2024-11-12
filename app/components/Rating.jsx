import {useEffect, useState} from 'react';

export default function Rating({defaultValue = 5}) {
  const btnRatings = [];
  const [currentRating, setCurrentRating] = useState(defaultValue);

  useEffect(() => {
    setCurrentRating(localStorage.getItem('rating') ?? defaultValue);
  }, [defaultValue]);

  for (let i = 1; i <= 5; i++) {
    btnRatings.push(
      <button
        key={i}
        onClick={() => {
          setCurrentRating(i);
          localStorage.setItem('rating', i);
        }}
        className="text-[1.5rem] text-orange"
      >
        {parseInt(currentRating) >= i ? '★' : '☆'}
      </button>,
    );
  }

  return (
    <div className="gap-1 flex items-center">
      {btnRatings}
      <h4>{currentRating}</h4>
    </div>
  );
}
