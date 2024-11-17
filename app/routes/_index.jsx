import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import IconsWithText from '~/components/IconsWithText';
import {AddToCartButton} from '~/components/AddToCartButton';
import AddToWishList from '~/components/AddToWishList';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Le Botaniste | Home'}];
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
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
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
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  return (
    <div className="home flex flex-col gap-12">
      <FeaturedCollection collection={data.featuredCollection} />
      <RecommendedProducts products={data.recommendedProducts} />
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
    <div className=" bg-dark-green flex justify-center">
      <div className="flex flex-col lg:flex-row gap-8 items-center p-4 max-w-[1600px] m-auto">
        <Link
          className="w-full lg:w-1/2"
          to={`/collections/${collection.handle}`}
        >
          {image && <Image className="rounded-lg" data={image} sizes="40vw" />}
        </Link>
        <div className="text-offWhite w-full lg:w-1/2 p-4">
          <h1>{collection.title}</h1>
          <p>{collection.description}</p>
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
function RecommendedProducts({products}) {
  return (
    <div className="flex flex-col gap-4 bg p-8 max-w-[1600px] m-auto ">
      <h2 className="text-dark-green">Produits en vedette</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {response
                ? response.products.nodes.map((product) => (
                    <Link
                      key={product.id}
                      className="flex flex-col bg-dark-green text-offWhite rounded-lg shadow-2xl"
                      to={`/products/${product.handle}`}
                    >
                      <Image
                        className="rounded-lg border-8 border-dark-green"
                        data={product.images.nodes[0]}
                        aspectRatio="1/1.3"
                        sizes="(width: 40em) 20vw, 30vw"
                      />
                      <div className="flex flex-col gap-4 p-4">
                        {' '}
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
