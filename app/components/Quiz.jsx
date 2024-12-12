import favicon from 'app/assets/favicon.svg';
import {useState} from 'react';

export default function Quiz({questionData, btnText, onClick, applyFilter}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  function handleRadioSelect(filter) {
    setSelectedAnswer(filter);
  }

  const {
    question,
    answer_1_label,
    answer_1_filter,
    answer_2_label,
    answer_2_filter,
    answer_3_label,
    answer_3_filter,
    answer_4_label,
    answer_4_filter,
  } = questionData;

  const answers = [
    {label: answer_1_label?.value, filter: answer_1_filter?.value},
    {label: answer_2_label?.value, filter: answer_2_filter?.value},
    {label: answer_3_label?.value, filter: answer_3_filter?.value},
    {label: answer_4_label?.value, filter: answer_4_filter?.value},
  ].filter((answer) => answer.label && answer.label.trim() !== '');

  return (
    <div className="bg-dark-green text-offWhite p-8 rounded-xl w-fit flex flex-col items-center gap-8 max-w-[700px]">
      <h3>{question.value}</h3>
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-6 w-full">
        <div className="flex flex-col gap-4">
          {answers.map((answer, index) => (
            <div className="flex gap-4 items-center" key={index}>
              <input
                className="peer h-5 w-5 min-w-5 cursor-pointer appearance-none rounded-full bg-offWhite border border-pink checked:border-2 checked:bg-pink transition-all"
                type="radio"
                name={`quiz-question-${questionData.id}`}
                value={answer.filter}
                onChange={() => handleRadioSelect(answer.filter)}
              />
              <label className="text-lg">{answer.label}</label>
            </div>
          ))}
        </div>
        <div className="w-[200px] h-[200px] bg-offWhite rounded-full border-4 border-pink flex justify-center items-center">
          <img
            className="w-[150px]"
            src={favicon}
            alt="Illustration de fougère"
          />
        </div>
      </div>
      <button
        className="bg-pink px-6 py-3 rounded-full border-2 border-dark-green text-dark-green  hover:shadow-lg"
        onClick={() => applyFilter(selectedAnswer)}
      >
        {btnText}
      </button>
    </div>
  );
}
