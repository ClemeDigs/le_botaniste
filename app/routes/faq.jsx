import Accordion from '~/components/Accordion';
import {faq} from '~/data/faq';

export default function Faq() {
  return (
    <div className="w-full flex flex-col items-center">
      <div>
        {faq.map((eachQuestion) => (
          <Accordion
            key={eachQuestion.id}
            question={eachQuestion.question}
            answer={eachQuestion.answer}
          />
        ))}
      </div>
    </div>
  );
}
