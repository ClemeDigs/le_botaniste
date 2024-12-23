import {Suspense} from 'react';
import {defer, redirect} from '@shopify/remix-oxygen';
import {Await, useLoaderData} from '@remix-run/react';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
} from '@shopify/hydrogen';
import {getVariantUrl} from '~/lib/variants';
import {ProductPrice} from '~/components/ProductPrice';
import {ProductImage} from '~/components/ProductImage';
import {ProductForm} from '~/components/ProductForm';
import Rating from '~/components/Rating';
import {IoPawSharp} from 'react-icons/io5';
import {GiWateringCan} from 'react-icons/gi';
import {LuSunMedium} from 'react-icons/lu';
import AddToWishList from '~/components/AddToWishList';
import ProductComments from '~/components/ProductComments';

/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data?.product.title ?? ''}`}];
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
async function loadCriticalData({context, params, request}) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option) => option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
  } else {
    // if no selected variant was returned from the selected options,
    // we redirect to the first variant's url with it's selected options applied
    if (!product.selectedVariant) {
      throw redirectToFirstVariant({product, request});
    }
  }

  return {
    product,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context, params}) {
  // In order to show which variants are available in the UI, we need to query
  // all of them. But there might be a *lot*, so instead separate the variants
  // into it's own separate query that is deferred. So there's a brief moment
  // where variant options might show as available when they're not, but after
  // this deffered query resolves, the UI will update.
  const variants = context.storefront
    .query(VARIANTS_QUERY, {
      variables: {handle: params.handle},
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    variants,
  };
}

/**
 * @param {{
 *   product: ProductFragment;
 *   request: Request;
 * }}
 */
function redirectToFirstVariant({product, request}) {
  const url = new URL(request.url);
  const firstVariant = product.variants.nodes[0];

  return redirect(
    getVariantUrl({
      pathname: url.pathname,
      handle: product.handle,
      selectedOptions: firstVariant.selectedOptions,
      searchParams: new URLSearchParams(url.search),
    }),
    {
      status: 302,
    },
  );
}

function parseMetafieldValue(value) {
  try {
    const parsedValue = JSON.parse(value);
    // Si la valeur analysée est un tableau, renvoyer le premier élément
    return Array.isArray(parsedValue) ? parsedValue[0] : parsedValue;
  } catch (error) {
    // Si la valeur n'est pas du JSON, la renvoyer telle quelle
    return value;
  }
}

export default function Product() {
  /** @type {LoaderReturnData} */
  const {product, variants} = useLoaderData();
  const selectedVariant = useOptimisticVariant(
    product.selectedVariant,
    variants,
  );

  function parseMetafieldValue(value) {
    try {
      const parsedValue = JSON.parse(value);
      // Si la valeur analysée est un tableau, renvoyer le premier élément
      return Array.isArray(parsedValue) ? parsedValue[0] : parsedValue;
    } catch (error) {
      // Si la valeur n'est pas du JSON, la renvoyer telle quelle
      return value;
    }
  }

  const {title, descriptionHtml} = product;

  return (
    <div className="flex flex-col gap-8 p-8 m-auto max-w-[1600px]">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-[50%] xl:w-[40%] flex items-center justify-center">
          <ProductImage
            className="border-8 border-dark-green"
            image={selectedVariant?.image}
          />
        </div>

        <div className="lg:w-[50%] xl:w-[60%] flex flex-col justify-between items-center lg:items-start">
          <div className="flex flex-col gap-3 max-w-[600px] lg:max-w-none m-auto lg:m-0">
            <div className="flex gap-4">
              <h1 className="text-dark-green text-center lg:text-start">
                {title}
              </h1>
              <AddToWishList className="text-[3.5rem]" productId={product.id} />
            </div>
            <Rating productId={product.title} />
            <div>
              {product.animaux?.value && (
                <p className="flex flex-row gap-3 items-center">
                  <span className="text-2xl">
                    <IoPawSharp />
                  </span>
                  {parseMetafieldValue(product.animaux.value)}
                </p>
              )}
              {product.arrosage?.value && (
                <p className="flex flex-row gap-3 items-center">
                  <span className="text-2xl">
                    <GiWateringCan />
                  </span>
                  {parseMetafieldValue(product.arrosage.value)}
                </p>
              )}
              {product.luminosite?.value && (
                <p className="flex flex-row gap-3 items-center">
                  <span className="text-2xl">
                    <LuSunMedium />
                  </span>
                  {parseMetafieldValue(product.luminosite.value)}
                </p>
              )}
            </div>
            <ProductPrice
              price={selectedVariant?.price}
              compareAtPrice={selectedVariant?.compareAtPrice}
            />

            <div>
              <p>
                <strong>Description</strong>
              </p>
              <div dangerouslySetInnerHTML={{__html: descriptionHtml}} />
            </div>
          </div>
          <Analytics.ProductView
            data={{
              products: [
                {
                  id: product.id,
                  title: product.title,
                  price: selectedVariant?.price.amount || '0',
                  vendor: product.vendor,
                  variantId: selectedVariant?.id || '',
                  variantTitle: selectedVariant?.title || '',
                  quantity: 1,
                },
              ],
            }}
          />
          <Suspense
            fallback={
              <ProductForm
                product={product}
                selectedVariant={selectedVariant}
                variants={[]}
              />
            }
          >
            <Await
              errorElement="There was a problem loading product variants"
              resolve={variants}
            >
              {(data) => (
                <ProductForm
                  product={product}
                  selectedVariant={selectedVariant}
                  variants={data?.product?.variants.nodes || []}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
      <ProductComments productId={product.id} />
    </div>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    animaux: metafield(key: "animaux", namespace: "custom"){
      value
    }
    arrosage: metafield(key: "arrosage", namespace: "custom"){
      value
    }
    luminosite: metafield(key: "luminosit_", namespace: "custom"){
      value
    }
    options {
      name
      values
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    variants(first: 1) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const PRODUCT_VARIANTS_FRAGMENT = `#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const VARIANTS_QUERY = `#graphql
  ${PRODUCT_VARIANTS_FRAGMENT}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').SelectedOption} SelectedOption */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
