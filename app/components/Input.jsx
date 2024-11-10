import {useState} from 'react';

/* export default function Input({defaultValue}) {
  const [inputValue, setInputValue] = useState(defaultValue);

  const changeInput = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input
        onInput={(event) => changeInput(event)}
        type="text"
        value={inputValue}
      />
      <p>{inputValue}</p>
    </div>
  );
} */

export default function Input({value, onInput}) {
  return (
    <div>
      <input onInput={onInput} type="text" value={value} />
      <p>{value}</p>
    </div>
  );
}
