import {SlArrowDown} from 'react-icons/sl';

/**
 *
 * @param {Object} props - Propriétés du composant.
 * @param {string} props.title
 * @param {string} props.content
 * @param {boolean} props.isOpen
 * @param {function} props.onClick
 * @returns {JSX.Element}
 */
export default function Accordion({title, content, isOpen, onClick}) {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-full p-4 bg-dark-green text-offWhite border border-dark transition hover:cursor-pointer hover:underline"
      >
        <div className="flex justify-between items-center gap-6">
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
