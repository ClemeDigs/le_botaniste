import {useState} from 'react';

export default function Accordion({question, answer}) {
  const [active, setActive] = useState(false);

  const toggleVisibility = () => {
    setActive(!active);
  };

  return (
    <div>
      <div
        className={`w-[300px] md:w-[500px] lg:w-[800px] p-4 bg-green-800 text-white border border-green-950 transition hover:cursor-pointer hover:bg-green-900`}
        onClick={toggleVisibility}
      >
        <div className="flex justify-between">
          <h3 className="font-bold">{question}</h3>
          <span className="font-bold text-xl">{active ? '-' : '+'}</span>
        </div>
      </div>
      <div
        className={`${
          active ? '' : 'hidden'
        } bg-green-100 border border-green-950 p-4 w-[300px] md:w-[500px] lg:w-[800px]`}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
}
