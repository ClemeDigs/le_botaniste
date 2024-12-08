import {useLoaderData} from '@remix-run/react';
import PageTitle from '~/components/PageTitle';
import Quiz from '~/components/Quiz';
import {useState} from 'react';
import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import AddToWishList from '~/components/AddToWishList';
import {Money} from '@shopify/hydrogen';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';

export async function loader({context}) {
  const productsData = await context.storefront.query(ALL_PRODUCTS_QUERY);
  const quizData = await context.storefront.query(QUIZ_QUERY);
  return {
    products: productsData.products.nodes,
    quiz: quizData.metaobjects.nodes,
  };
}

export default function QuizPage() {
  const {quiz, products} = useLoaderData();

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  function filterProductBySelectedFilters(product, selectedFilters) {
    for (let i = 0; i < selectedFilters.length; i++) {
      const filter = selectedFilters[i];

      if (!filter) {
        continue;
      }

      const [key, value] = filter.split('=');

      if (value === 'Tout' || value === 'Non toxique') {
        continue;
      }

      if (!product[key] || !product[key].value) {
        return false;
      }

      let productValues;
      try {
        productValues = JSON.parse(product[key].value);
      } catch (e) {
        return false;
      }

      if (!productValues.includes(value)) {
        return false;
      }
    }
    return true;
  }

  function handleSelectFilter(currentQuestionIndex, filter) {
    setSelectedFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      newFilters[currentQuestionIndex] = filter;
      return newFilters;
    });

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  }

  const filteredProducts = [];
  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    const productPassesFilters = filterProductBySelectedFilters(
      product,
      selectedFilters,
    );

    if (productPassesFilters) {
      filteredProducts.push(product);
    }
  }

  const question = quiz[currentQuestionIndex];

  return (
    <div>
      <PageTitle title="Quiz"></PageTitle>
      <div className="p-8 max-w-[1600px] m-auto flex flex-col gap-10 items-center">
        <h2 className="text-dark-green">Quelle plante est faite pour toi?</h2>
        {currentQuestionIndex < quiz.length ? (
          <Quiz
            key={question.id}
            questionData={question}
            btnText={
              filteredProducts.length === 0
                ? 'Voir les résultats'
                : 'Question suivante'
            }
            applyFilter={(selectedAnswer) =>
              handleSelectFilter(currentQuestionIndex, selectedAnswer)
            }
          />
        ) : (
          <div className="p-8 max-w-[1600px] m-auto flex flex-col gap-4">
            <h3 className="text-dark-green">Plante(s) faite(s) pour toi :</h3>
            {filteredProducts.length === 0 ? (
              <h4 className="text-dark-green">
                Malheureusement, aucune plante ne correspond à tes critères.
                Essaie de changer l'exposition ou l'arrosage!
              </h4>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col items-center pb-4 bg-dark-green text-offWhite rounded-lg shadow-2xl"
                  >
                    <Link
                      className="flex flex-col"
                      to={`/products/${product.handle}`}
                    >
                      <Image
                        className="rounded-lg border-8 border-dark-green"
                        data={product.images.nodes[0]}
                        aspectRatio="1/1.3"
                      />
                      <div className="flex flex-col gap-4 p-4">
                        <div className="flex gap-4 items-center">
                          <h4 className="text-offWhite">{product.title}</h4>
                          <AddToWishList
                            className="text-[1rem]"
                            productId={product.id}
                          />
                        </div>
                        <small>
                          <Money
                            className="text-offWhite"
                            data={product.priceRange.minVariantPrice}
                          />
                        </small>
                      </div>
                    </Link>
                    <AddToCartButton
                      onClick={() => {
                        open('cart');
                      }}
                      lines={[
                        {
                          merchandiseId: product.variants.nodes[0].id,
                          quantity: 1,
                          selectedVariant: product.variants.nodes[0],
                        },
                      ]}
                    >
                      Ajouter au panier
                    </AddToCartButton>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const ALL_PRODUCTS_QUERY = `#graphql
query products {
  products(first: 250) {
    nodes {
      id
      title
      handle
      animaux: metafield(key: "animaux", namespace: "custom"){
      value
    }
    arrosage: metafield(key: "arrosage", namespace: "custom"){
      value
    }
    luminosite: metafield(key: "luminosit_", namespace: "custom"){
      value
    }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 1) {
        nodes {
          id
          url
          altText
          width
          height
        }
      }
      variants(first: 1) {
        nodes {
          id
          selectedOptions {
            value
            name
          }
          product {
            handle
          }
        }
      }
    }
  }
}`;

const QUIZ_QUERY = `#graphql
query quiz {
  metaobjects(first: 250, type: "quiz") {
    nodes {
      id
      question: field(key: "question") {
        value
      }
      answer_1_label: field(key: "aswer_1_label") {
        value
      }
      answer_1_filter: field(key: "aswer_1_filter") {
        value
      }
      answer_2_label: field(key: "aswe_2_label") {
        value
      }
      answer_2_filter: field(key: "aswer_2_filter") {
        value
      }
      answer_3_label: field(key: "aswer_3_label") {
        value
      }
      answer_3_filter: field(key: "answer_3_filter") {
        value
      }
      answer_4_label: field(key: "answer_4_label") {
        value
      }
      answer_4_filter: field(key: "answer_4_filter") {
        value
      }
    }
  }
}
`;
