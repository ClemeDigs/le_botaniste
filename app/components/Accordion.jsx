import {SlArrowDown} from 'react-icons/sl';

export default function Accordion({title, content, isOpen, onClick}) {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-full p-4 bg-dark-green text-offWhite border border-dark transition hover:cursor-pointer hover:underline"
      >
        <div className="flex justify-between items-center">
          <h5 className="w-full text-center lg:text-start lg:pl-16">{title}</h5>
          <SlArrowDown
            className={`${
              isOpen ? 'rotate-180' : ''
            } transition-transform text-3xl font-bold`}
          />
        </div>
      </button>
      {isOpen && (
        <div className="bg-pink border border-dark p-4 w-full">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}
