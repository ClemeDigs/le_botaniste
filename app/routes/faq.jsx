import {useLoaderData} from '@remix-run/react';
import Accordions from '~/components/Accordions';
import SearchBar from '~/components/SearchBar';
import {useState} from 'react';

export async function loader({context}) {
  const data = await context.storefront.query(FAQ_QUERY);
  return {faq: data.metaobjects.nodes};
}

const FAQ_QUERY = `#graphql
query faq {
  metaobjects(first: 250, type: "faq") {
    nodes {
      id
      question: field(key: "question") {
        value
      }
      answer: field(key: "answer") {
        value
      }
    }
  }
}
`;

export default function Faq() {
  const {faq} = useLoaderData();

  const [searchValue, setSearchValue] = useState('');

  function onSearch(e) {
    setSearchValue(e.target.value);
  }

  const filteredFaq = faq.filter((eachQuestion) =>
    eachQuestion.question.value
      .toLowerCase()
      .includes(searchValue.toLowerCase()),
  );

  return (
    <div className="p-8 flex flex-col max-w-[2000px] m-auto">
      <h1 className="text-dark-green">FAQ</h1>
      <SearchBar onSearch={onSearch} />
      <Accordions
        accordions={filteredFaq.map((eachQuestion) => ({
          id: eachQuestion.id,
          title: eachQuestion.question.value,
          content: eachQuestion.answer.value,
        }))}
      />
    </div>
  );
}

// Code initial Clémentine
// export default function Faq() {
//   const [searchValue, setSearchValue] = useState('');

//   function onSearch(e) {
//     setSearchValue(e.target.value);
//   }

//   const filteredFaq = faq.filter((eachQuestion) =>
//     eachQuestion.question.toLowerCase().includes(searchValue.toLowerCase()),
//   );

//   return (
//     <div className="w-full flex flex-col items-center gap-4">
//       <h2>FAQ</h2>
//       <SearchBar onSearch={onSearch} />
//       <Accordions
//         accordions={filteredFaq.map((eachQuestion) => ({
//           id: eachQuestion.id,
//           title: eachQuestion.question,
//           content: eachQuestion.answer,
//         }))}
//       />
//     </div>
//   );
