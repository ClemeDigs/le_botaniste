import Accordions from '~/components/Accordions';
import SearchBar from '~/components/SearchBar';
import favicon from 'app/assets/favicon.svg';
import {useState} from 'react';
import {useLoaderData} from '@remix-run/react';
import PageTitle from '~/components/PageTitle';

export async function loader({context}) {
  const data = await context.storefront.query(FAQ_QUERY);
  return {faq: data.metaobjects.nodes};
}

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
    <div>
      <PageTitle title="FAQ"></PageTitle>
      <div className="py-12 lg:px-12 p-8 m-auto">
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="relative w-full flex flex-col items-center gap-4 mt-12">
        <img
          className="w-[100px] absolute top-[-80px] left-[60px]"
          src={favicon}
          alt="Illustration de fougère"
        />
        <Accordions
          accordions={filteredFaq.map((eachQuestion) => ({
            id: eachQuestion.id,
            title: eachQuestion.question.value,
            content: eachQuestion.answer.value,
          }))}
        />
      </div>
    </div>
  );
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
