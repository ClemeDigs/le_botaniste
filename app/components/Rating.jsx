import {useEffect, useState} from 'react';

export default function Rating({defaultValue = 5, productId}) {
  const btnRatings = [];
  const [currentRating, setCurrentRating] = useState(defaultValue);

  useEffect(() => {
    const storedRating = localStorage.getItem(`rating-${productId}`);
    setCurrentRating(storedRating ?? defaultValue);
  }, [defaultValue, productId]);

  const handleRatingClick = (rating) => {
    setCurrentRating(rating);
    localStorage.setItem(`rating-${productId}`, rating);
  };

  for (let i = 1; i <= 5; i++) {
    btnRatings.push(
      <button
        key={i}
        onClick={() => handleRatingClick(i)}
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
