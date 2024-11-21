import {SlArrowDown} from 'react-icons/sl';

export default function Accordion({title, content, isOpen, onClick}) {
  return (
    <div>
      <button
        onClick={onClick}
        className="test grid gap-3 w-[300px] md:w-[500px] lg:w-[800px] p-4 bg-dark-green text-white border-dark transition hover:cursor-pointer hover:bg-pink hover:text-dark-green rounded-l"
      >
        <div className="flex justify-between items-center">
          <h5>{title}</h5>
          <SlArrowDown
            className={`${isOpen ? 'rotate-180' : ''} transition-transform`}
          />
        </div>
      </button>
      {isOpen && (
        <div className="bg-offWhite border p-4 w-[300px] md:w-[500px] lg:w-[800px] hover:border-dark-green">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}
