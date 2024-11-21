import Accordion from '~/components/Accordion';
import {useState} from 'react';

export default function Accordions({accordions = [], className}) {
  const [currentAccordionId, setCurrentAccordionId] = useState(0);

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
