import {useEffect, useState} from 'react';

/**
 * @typedef {Object} Rating
 * @property {string} productId
 * @property {number} currentRating
 */

/**
 *
 * @param {Object} props - Propriétés du composant.
 * @param {number} props.defaultValue
 * @param {string} props.productId
 * @returns {React.JSX.Element}
 */
export default function Rating({defaultValue = 5, productId}) {
  /**
   * @type {number}
   */
  const [currentRating, setCurrentRating] = useState(defaultValue);
  /**
   * @type {Rating[]}
   */
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    /**
     * @type {Rating[]}
     */
    const storedRatings = JSON.parse(localStorage.getItem('ratings')) || [];
    setRatings(storedRatings);

    /**
     * @type {number | undefined}
     */
    const storedRatingForProduct = storedRatings.find(
      (rating) => rating.productId === productId,
    )?.currentRating;

    setCurrentRating(storedRatingForProduct ?? defaultValue);
  }, [defaultValue, productId]);

  /**
   * @param {number} rating
   * @returns {void}
   */
  const handleRatingClick = (rating) => {
    setCurrentRating(rating);

    /**
     * @type {Rating[]}
     */
    const updatedRatings = [
      ...ratings.filter((r) => r.productId !== productId),
      {productId, currentRating: rating},
    ];
    setRatings(updatedRatings);

    localStorage.setItem('ratings', JSON.stringify(updatedRatings));
  };

  /**
   * @type {React.JSX.Element[]}
   */
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
