import {useEffect, useState} from 'react';

export default function Rating({defaultValue = 5, productId}) {
  const [currentRating, setCurrentRating] = useState(defaultValue);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const storedRatings = JSON.parse(localStorage.getItem('ratings')) || [];
    setRatings(storedRatings);

    const storedRatingForProduct = storedRatings.find(
      (rating) => rating.productId === productId,
    )?.currentRating;

    setCurrentRating(storedRatingForProduct ?? defaultValue);
  }, [defaultValue, productId]);

  const handleRatingClick = (rating) => {
    setCurrentRating(rating);

    const updatedRatings = [
      ...ratings.filter((r) => r.productId !== productId),
      {productId, currentRating: rating},
    ];
    setRatings(updatedRatings);

    localStorage.setItem('ratings', JSON.stringify(updatedRatings));
  };

  const btnRatings = [];
  for (let i = 1; i <= 5; i++) {
    btnRatings.push(
      <button
        key={i}
        onClick={() => handleRatingClick(i)}
        className="text-[1.5rem] text-orange"
      >
        {currentRating >= i ? '★' : '☆'}
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
