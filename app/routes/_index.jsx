import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import IconsWithText from '~/components/IconsWithText';
import {AddToCartButton} from '~/components/AddToCartButton';
import AddToWishList from '~/components/AddToWishList';
import PageTitle from '~/components/PageTitle';
import {useAside} from '~/components/Aside';
import DynamicBanner from '~/components/DynamicBanner';
import {BANNER_QUERY} from '~/graphql/customer-account/DynamicContent';
import mosaique from 'app/assets/mosaique.svg';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Le Botaniste | Accueil'}];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({context}) {
  const [{collections}, {metaobjects}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    context.storefront.query(BANNER_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
    dynamicContents: metaobjects?.nodes ?? [],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context}) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const {dynamicContents, featuredCollection, recommendedProducts} =
    useLoaderData();
  return (
    <div className="flex flex-col items-center">
      <FeaturedCollection collection={featuredCollection} />
      <RecommendedProducts products={recommendedProducts} />
      <DynamicBanner contents={dynamicContents}></DynamicBanner>
      <IconsWithText />
    </div>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
  if (!collection) return null;

  const image = collection?.image;
  return (
    <div className=" bg-offWhite shadow-lg flex justify-center">
      <div className="grid lg:grid-cols-2 2xl:grid-cols-3">
        <div className=" flex flex-col items-center justify-between">
          <div className="hidden lg:flex p-3 lg:p-0 lg:h-1/2 w-full justify-center items-center bg-dark-green lg:bg-offWhite">
            <h1 className="text-offWhite lg:text-dark-green text-center">
              {collection.title}
            </h1>
          </div>
          <div className="lg:hidden">
            <PageTitle
              title={collection.title}
              className="h-[210px] md:h-[80px] lg:h-[120px]"
            />
          </div>
          <img
            className="w-full hidden 2xl:inline-block"
            src={mosaique}
            alt="motifs colorés"
          />
          <Link
            className="hidden lg:inline-block w-full lg:h-1/2 2xl:h-auto 2xl:hidden"
            to={`/collections/${collection.handle}`}
          >
            {image && (
              <Image
                className="h-full object-cover object-center rounded-b-lg 2xl:rounded-lg border-8 border-dark-green"
                data={image}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </Link>
        </div>
        <div className="flex flex-col justify-center lg:hidden 2xl:inline-block">
          <Link className="h-full" to={`/collections/${collection.handle}`}>
            {image && (
              <Image
                className="h-full object-cover object-center rounded-b-lg 2xl:rounded-lg border-8 border-dark-green"
                data={image}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </Link>
        </div>
        <div className="flex flex-col justify-between items-center">
          <img
            className="hidden lg:inline-block w-full lg:h-1/2 lg:object-cover lg:object-center 2xl:object-contain "
            src={mosaique}
            alt="motifs colorés"
          />
          <div className="p-4 text-dark lg:h-1/2 2xl:h-auto h-full flex flex-col items-center justify-center gap-3">
            <p>{collection.description}</p>
            <Link
              className="bg-dark-green text-offWhite px-6 py-3 rounded-full hover:shadow-lg"
              to={`/collections/${collection.handle}`}
            >
              Voir la collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery | null>;
 * }}
 */
function RecommendedProducts({products, product, selectedVariant, variants}) {
  const {open} = useAside();
  return (
    <div className="flex flex-col gap-4 bg p-8 max-w-[1600px] m-auto ">
      <h2 className="text-dark-green">Produits en vedette</h2>
      <Suspense fallback={<div>Chargement...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {response
                ? response.products.nodes.map((product) => (
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
                          sizes="(max-width: 768px) 100vw, 50vw"
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
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    description
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 1){
      nodes{
        id
        selectedOptions {
          name
          value
        }
        product {
          handle
        }
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
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
