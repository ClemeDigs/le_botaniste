/* import {useState} from 'react';

export default function RatingPage() {
  return <Ratings />;
}

function Rating({index, selectedRating, onChange}) {
  return (
    <input
      type="radio"
      name="ratings"
      checked={selectedRating === index}
      onChange={() => onChange(index)}
    />
  );
}

function Ratings() {
  const [selectedRating, setSelectedRating] = useState(5);

  return (
    <div className="flex gap-6 ">
      <div className="flex gap-3">
        <Rating
          index={1}
          selectedRating={selectedRating}
          onChange={setSelectedRating}
          key={1}
        />
        <Rating
          index={2}
          selectedRating={selectedRating}
          onChange={setSelectedRating}
          key={2}
        />
        <Rating
          index={3}
          selectedRating={selectedRating}
          onChange={setSelectedRating}
          key={3}
        />
        <Rating
          index={4}
          selectedRating={selectedRating}
          onChange={setSelectedRating}
          key={4}
        />
        <Rating
          index={5}
          selectedRating={selectedRating}
          onChange={setSelectedRating}
          key={5}
        />
      </div>
      <p>{selectedRating}</p>
    </div>
  );
} */

import {useState} from 'react';

export default function RatingPage() {
  return <Ratings />;
}

function Rating({onChange, id}) {
  return (
    <input type="radio" name="ratings" id={id} onChange={() => onChange(id)} />
  );
}

function Ratings() {
  const [selectedRating, setSelectedRating] = useState(5);

  function handleRating(newRating) {
    setSelectedRating(newRating);
  }

  return (
    <div className="flex gap-6 ">
      <div className="flex gap-3">
        <Rating onChange={handleRating} id={1} />
        <Rating onChange={handleRating} id={2} />
        <Rating onChange={handleRating} id={3} />
        <Rating onChange={handleRating} id={4} />
        <Rating onChange={handleRating} id={5} />
      </div>
      <p>{selectedRating}</p>
    </div>
  );
}
