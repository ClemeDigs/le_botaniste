import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from '@remix-run/react';
import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import logo from 'app/assets/le_botaniste_logo-seul.svg';
import {Link, Links} from '@remix-run/react';
import {LuSearch} from 'react-icons/lu';
import {LuShoppingBasket} from 'react-icons/lu';
import {LuUserCircle2} from 'react-icons/lu';
import {TbHeart} from 'react-icons/tb';
import {LuAlignJustify} from 'react-icons/lu';
import MegaMenu from './MegaMenu';
import {useState} from 'react';
import {SlArrowDown} from 'react-icons/sl';

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart, publicStoreDomain}) {
  const {menu} = header;
  return (
    <header className="w-full p-3 top-0 md:mb-12 sticky z-10">
      <div className="bg-pink p-3 rounded-full">
        <div className="max-w-[1600px] m-auto flex flex-col sm:flex-row justify-between items-center">
          <NavLink
            prefetch="intent"
            to="/"
            className="items-center flex text-dark-green"
          >
            <img
              className="logo-seul w-[60px]"
              src={logo}
              alt="Petit logo - Le Botaniste"
            />
            <span className="font-heading text-dark-green text-2xl">
              Le Botaniste
            </span>
          </NavLink>

          <MegaMenu
            menuItems={menu.items}
            primaryDomainUrl={header.shop.primaryDomain.url}
            publicStoreDomain={publicStoreDomain}
          ></MegaMenu>
          <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
        </div>
      </div>
    </header>
  );
}

/**
 *
 * @param {Object} props - Propriétés du composant.
 * @param {MenuItem} props.menuItem
 * @param {string} props.primaryDomainUrl
 * @param {string} props.publicStoreDomain
 * @returns {React.JSX.Element}
 */
function MenuItemMobile({menuItem, publicStoreDomain, primaryDomainUrl}) {
  /**
   * @type {boolean}
   */
  const [isOpen, setIsOpen] = useState(false);

  /**
   * @type {string}
   */
  const url =
    menuItem.url.includes('myshopify.com') ||
    menuItem.url.includes(publicStoreDomain) ||
    menuItem.url.includes(primaryDomainUrl)
      ? new URL(menuItem.url).pathname
      : menuItem.url;

  /**
   * @returns {void}
   */
  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <li className="flex flex-col px-4 text-dark-green">
      {menuItem.items && menuItem.items.length > 0 ? (
        <>
          <button
            onClick={toggleMenu}
            className="font-medium cursor-pointer flex justify-between items-center w-full py-2"
          >
            {menuItem.title}
            <SlArrowDown
              className={`${
                isOpen ? 'rotate-180' : ''
              } transition-transform text-xl font-bold`}
            ></SlArrowDown>
          </button>
          <ul
            className={`px-6 transition-all duration-300 ${
              isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            {menuItem.items.map((subItem, index) => (
              <MenuItemMobile
                key={index}
                menuItem={subItem}
                publicStoreDomain={publicStoreDomain}
                primaryDomainUrl={primaryDomainUrl}
              />
            ))}
          </ul>
        </>
      ) : (
        <div className="py-2">
          <a href={url}>
            <span className="font-semibold">{menuItem.title}</span>
          </a>
        </div>
      )}
    </li>
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
  const className = `header-menu-${viewport} flex flex-col`;

  return (
    <nav className={className} role="navigation">
      <ul>
        {(menu || FALLBACK_HEADER_MENU).items.map((item, index) => (
          <MenuItemMobile
            key={index}
            menuItem={item}
            publicStoreDomain={publicStoreDomain}
            primaryDomainUrl={primaryDomainUrl}
          />
        ))}
      </ul>
    </nav>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({isLoggedIn, cart}) {
  return (
    <nav className="items-center align-middle flex gap-3" role="navigation">
      <HeaderMenuMobileToggle />
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            <div className="flex gap-1 items-center">
              <LuUserCircle2 />
              <span className="hidden lg:inline">Connexion</span>
            </div>
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <LikedProducts />
      <CartToggle cart={cart} />
    </nav>
  );
}

/**
 *
 * @returns {React.JSX.Element}
 */
function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset lg:hidden"
      onClick={() => open('mobile')}
    >
      <LuAlignJustify />
    </button>
  );
}

/**
 *
 * @returns {React.JSX.Element}
 */
function SearchToggle() {
  const {open} = useAside();
  return (
    <a className="reset flex gap-1 items-center" onClick={() => open('search')}>
      <LuSearch /> <span className="hidden lg:inline">Recherche </span>
    </a>
  );
}

/**
 *
 * @returns {React.JSX.Element}
 */
function LikedProducts() {
  return (
    <Link to="/wishList" className=" flex gap-1 items-center">
      <TbHeart /> <span className="hidden lg:inline">Favoris </span>
    </Link>
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
      className="flex items-center gap-1"
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
      <LuShoppingBasket /> <span className="hidden lg:inline">Panier</span>{' '}
      {count === null ? <span>&nbsp;</span> : count}
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
