import Accordion from '~/components/Accordion';
import {useState} from 'react';

/**
 *
 * @param {Object} props - Propriétés du composant.
 * @param {{id: number, title: string, content: string}[]} props.accordions
 * @param {string} props.className
 * @returns {React.JSX.Element}
 */
export default function Accordions({accordions = [], className}) {
  /**
   * @type {number}
   */
  const [currentAccordionId, setCurrentAccordionId] = useState(0);

  /**
   *
   * @param {number} accordionId
   * @returns {void}
   */
  function onAccordionClick(accordionId) {
    setCurrentAccordionId((prevId) =>
      prevId === accordionId ? null : accordionId,
    );
  }

  return (
    <div className={`w-[90%] ${className}`}>
      {accordions.map((accordion) => (
        <Accordion
          key={accordion.id}
          title={accordion.title}
          content={accordion.content}
          isOpen={currentAccordionId === accordion.id}
          onClick={() => onAccordionClick(accordion.id)}
        />
      ))}
    </div>
  );
}
