import {SlArrowDown} from 'react-icons/sl';

export default function Accordion({
  title,
  content,
  isOpen = false,
  onClick = () => {},
}) {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-[300px] md:w-[500px] lg:w-[800px] p-4 bg-green-800 text-white border border-green-950 transition hover:cursor-pointer hover:bg-green-900"
      >
        <div className="flex justify-between items-center">
          <h3 className="font-bold">{title}</h3>
          <SlArrowDown
            className={`${isOpen ? 'rotate-180' : ''} transition-transform`}
          />
        </div>
      </button>
      {isOpen && (
        <div className="bg-green-100 border border-green-950 p-4 w-[300px] md:w-[500px] lg:w-[800px]">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}
