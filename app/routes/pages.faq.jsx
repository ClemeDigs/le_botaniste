import Accordions from '~/components/Accordions';
import SearchBar from '~/components/SearchBar';
import favicon from 'app/assets/favicon.svg';
import {useState} from 'react';
import {useLoaderData} from '@remix-run/react';
import PageTitle from '~/components/PageTitle';

/**
 * @typedef {Object} Faq
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

/**
 *
 * @param {import('@remix-run/react').LoaderFunctionArgs} args
 * @returns {{ faq: Faq[] }}
 */
export async function loader({context}) {
  const data = await context.storefront.query(FAQ_QUERY);
  return {faq: data.metaobjects.nodes};
}

/**
 *
 * @returns {React.JSX.Element}
 */
export default function Faq() {
  const {faq} = useLoaderData();
  /**
   * @type {string}
   */
  const [searchValue, setSearchValue] = useState('');

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @returns {void}
   */
  function onSearch(e) {
    setSearchValue(e.target.value);
  }

  /**
   * @type {Faq[]}
   */
  const filteredFaq = faq.filter((eachQuestion) =>
    eachQuestion.question.value
      .toLowerCase()
      .includes(searchValue.toLowerCase()),
  );

  return (
    <div className="pb-20">
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
        {filteredFaq.length > 0 ? (
          <Accordions
            accordions={filteredFaq.map((eachQuestion) => ({
              id: eachQuestion.id,
              title: eachQuestion.question.value,
              content: eachQuestion.answer.value,
            }))}
          />
        ) : (
          <div className="border-t-4 border-dark-green p-8 w-full">
            <p>Aucun résultat trouvé pour votre recherche.</p>
          </div>
        )}
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
