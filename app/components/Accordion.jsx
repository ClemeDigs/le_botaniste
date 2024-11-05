import {SlArrowDown} from 'react-icons/sl';

export default function Accordion({title, content, isOpen, onClick}) {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-[300px] md:w-[500px] lg:w-[800px] p-4 bg-pink text-dark border border-dark transition hover:cursor-pointer hover:bg-orange"
      >
        <div className="flex justify-between items-center">
          <h5>{title}</h5>
          <SlArrowDown
            className={`${isOpen ? 'rotate-180' : ''} transition-transform`}
          />
        </div>
      </button>
      {isOpen && (
        <div className="bg-orange-100 border border-dark p-4 w-[300px] md:w-[500px] lg:w-[800px]">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}
