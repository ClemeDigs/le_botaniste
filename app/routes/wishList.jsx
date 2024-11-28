import {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import {useLoaderData, Link} from '@remix-run/react';
import {Money, Image} from '@shopify/hydrogen';
import AddToWishList from '~/components/AddToWishList';
import PageTitle from '~/components/PageTitle';

export async function loader({context, request}) {
  const cookie = request.headers
    .get('Cookie')
    ?.split('; ')
    .map((cookie) => cookie.split('='));

  const wishlisted = cookie?.find((item) => item[0] === 'wishlisted');

  if (wishlisted) {
    const wishlistedValue = JSON.parse(decodeURIComponent(wishlisted[1]));
    const productIds = Object.keys(wishlistedValue);

    const data = await context.storefront.query(PRODUCTS_QUERY, {
      variables: {ids: productIds},
    });

    return {products: data.nodes.filter((product) => product !== null)};
  }

  return {products: []};
}

export default function WishList() {
  const data = useLoaderData();
  const [favoriteProducts, setFavoriteProducts] = useState(data.products);

  function removeProductFromFavorites(productId) {
    const updatedFavorites = favoriteProducts.filter(
      (product) => product.id !== productId,
    );
    setFavoriteProducts(updatedFavorites);

    const cookie = Cookies.get('wishlisted');
    if (cookie) {
      const parsedCookie = JSON.parse(cookie);
      delete parsedCookie[productId];
      Cookies.set('wishlisted', JSON.stringify(parsedCookie), {expires: 7});
    }
  }

  return (
    <div className="py-8 flex flex-col gap-8">
      <PageTitle title="Favoris" />
      {favoriteProducts.length > 0 ? (
        <div className="max-w-[1600px] m-auto grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
          {favoriteProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              removeProduct={removeProductFromFavorites}
            />
          ))}
        </div>
      ) : (
        <p>Tu n'as aucun produit favoris!</p>
      )}
    </div>
  );
}

function ProductItem({product, removeProduct}) {
  const productUrl = '/products/' + product.handle;

  return (
    <div className="bg-dark-green rounded-lg text-offWhite" key={product.id}>
      {product.featuredImage && (
        <Image
          className="rounded-lg border-8 border-dark-green"
          alt={product.featuredImage.altText || product.title}
          aspectRatio="1/1.3"
          data={product.featuredImage}
          sizes="(min-width: 45em) 400px, 100vw"
        />
      )}
      <div className="p-3 text-offWhite">
        <div className="flex gap-4">
          <h4 className="text-offWhite">{product.title}</h4>
          <AddToWishList
            className="text-[1rem]"
            productId={product.id}
            onToggleFavorite={() => removeProduct(product.id)}
          />
        </div>
        <small>
          <Money data={product.priceRange.minVariantPrice} />
        </small>
      </div>
    </div>
  );
}

const PRODUCTS_QUERY = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }

  query Products($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        title
        handle
        featuredImage {
          url(transform: { maxHeight: 200, maxWidth: 200 })
        }
        priceRange {
          minVariantPrice {
            ...MoneyProductItem
          }
          maxVariantPrice {
            ...MoneyProductItem
          }
        }
      }
    }
  }
`;
