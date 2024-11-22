import Accordions from '~/components/Accordions';
import SearchBar from '~/components/SearchBar';
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
    <div className="w-full flex flex-col items-center gap-4">
      <h2>FAQ</h2>
      <SearchBar onSearch={onSearch} />
      <Accordions
        accordions={filteredFaq.map((eachQuestion) => ({
          id: eachQuestion.id,
          title: eachQuestion.question,
          content: eachQuestion.answer,
        }))}
      />
    </div>
  );
}
