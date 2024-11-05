import {useState} from 'react';

export default function counter() {
  const [count, setCount] = useState(0);

  let decrement = () => {
    if (count !== 0) {
      setCount(count - 1);
    } else {
      setCount(0);
    }
  };

  let increment = () => {
    setCount(count + 1);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h3>{count}</h3>
      <div className="flex gap-4">
        <button
          className="bg-orange px-4 py-2 rounded-full border border-dark"
          onClick={decrement}
        >
          -
        </button>
        <button
          className="bg-orange px-4 py-2 rounded-full border border-dark"
          onClick={increment}
        >
          +
        </button>
      </div>
    </div>
  );
}
