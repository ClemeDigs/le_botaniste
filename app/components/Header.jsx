import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from '@remix-run/react';
import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import logo from 'app/assets/le_botaniste_logo-seul.svg';
import Navigation from './Navigation';
import {Link, Links} from '@remix-run/react';
import cart from 'app/assets/cart.svg';
import glass from 'app/assets/glass.svg';

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart, publicStoreDomain}) {
  const {shop, menu} = header;
  return (
    <header className="sticky top-0 left-0 z-50 bg-white">
      <div className="bg-dark-green text-white text-center p-2">
        <p>Livraison gratuie à partir de 60$</p>
      </div>
      <div className="header-global-wrapper p-3">
        <div className="header-wrapper bg-pink p-3 flex justify-between items-center rounded-full">
          <div className="flex items-center gap-1">
            <img
              className="logo-seul w-[60px]"
              src={logo}
              alt="Petit logo - Le Botaniste"
            />
            <span className="font-heading text-dark-green">Le Botaniste</span>
          </div>

          <Navigation></Navigation>
          <HeaderCta />
          {/* <NavLink
            prefetch="intent"
            to="/"
            style={activeLinkStyle}
            className={'gap-3'}
            end
          ></NavLink> */}
          {/* <HeaderMenu
            menu={menu}
            viewport="desktop"
            primaryDomainUrl={header.shop.primaryDomain.url}
            publicStoreDomain={publicStoreDomain}
          /> */}
          {/* <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} /> */}
        </div>
      </div>
    </header>
  );
}

function HeaderCta() {
  return (
    <div>
      <ul className="flex flex-row gap-6 items-center">
        <li>
          <Link to="faq">Connexion</Link>
        </li>
        <li>
          <Link to="faq" className="flex gap-1 items-center">
            Recherche
            <img className="glass w-[20px] rotate-45" src={glass} alt="Loupe" />
          </Link>
        </li>
        <li>
          <Link to="faq" className="flex gap-1 items-center">
            Panier
            <img className="cart w-[30px]" src={cart} alt="Panier" />
          </Link>
        </li>
      </ul>
    </div>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 *   publicStoreDomain: HeaderProps['publicStoreDomain'];
 * }}
 */
export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}) {
  const className = `header-menu-${viewport}`;
  const {close} = useAside();

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

/**
//  * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
*/
// function HeaderCtas({isLoggedIn, cart}) {
//   return (
//     <nav className="header-ctas" role="navigation">
//       <HeaderMenuMobileToggle />
//       <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
//         <Suspense fallback="Sign in">
//           <Await resolve={isLoggedIn} errorElement="Sign in">
//             {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
//           </Await>
//         </Suspense>
//       </NavLink>
//       <SearchToggle />
//       <CartToggle cart={cart} />
//     </nav>
//   );
// }

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset hidden"
      onClick={() => open('mobile')}
    >
      <h3>☰</h3>
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button className="reset" onClick={() => open('search')}>
      Search
    </button>
  );
}

/**
 * @param {{count: number | null}}
 */
function CartBadge({count}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
    >
      Cart {count === null ? <span>&nbsp;</span> : count}
    </a>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}

/** @typedef {'desktop' | 'mobile'} Viewport */
/**
 * @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 */

/** @typedef {import('@shopify/hydrogen').CartViewPayload} CartViewPayload */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
