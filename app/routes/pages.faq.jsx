import Accordions from '~/components/Accordions';
import SearchBar from '~/components/SearchBar';
import favicon from 'app/assets/favicon.svg';
import {faq} from '~/data/faq';
import {useState} from 'react';

export default function Faq() {
  const [searchValue, setSearchValue] = useState('');

  function onSearch(e) {
    setSearchValue(e.target.value);
  }

  const filteredFaq = faq.filter((eachQuestion) =>
    eachQuestion.question.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div className="p-8 max-w-[1600px] m-auto">
      <div className="lg:p-12 flex flex-col md:flex-row justify-between">
        <h1 className="text-dark-green">FAQ</h1>
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="relative w-full flex flex-col items-center gap-4 mt-12 z-0">
        <img
          className="w-[100px] absolute top-[-80px] left-[60px]"
          src={favicon}
          alt="Illustration de fougère"
        />
        <Accordions
          className=""
          accordions={filteredFaq.map((eachQuestion) => ({
            id: eachQuestion.id,
            title: eachQuestion.question,
            content: eachQuestion.answer,
          }))}
        />
      </div>
    </div>
  );
}
