import {Suspense} from 'react';
import {Await, NavLink} from '@remix-run/react';
import logo from 'app/assets/le_botaniste_logo.svg';
import {
  LuMapPin,
  LuPhone,
  LuCopyright,
  LuFacebook,
  LuInstagram,
  LuLinkedin,
} from 'react-icons/lu';
import {FaAt} from 'react-icons/fa6';

import {GetCurrentYear} from '~/components/GetCurrentYear';
import Subscribe from './Subscribe';

/**
 * @param {FooterProps}
 */
export function Footer({footer: footerPromise, header, publicStoreDomain}) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="w-full bg-dark-green text-offWhite flex">
            {footer?.menu && header.shop.primaryDomain?.url && (
              <div className="max-w-[1440px] m-auto w-full flex flex-col gap-3 items-center md:flex-row md:justify-evenly  py-8 lg:items-start">
                <div className="flex flex-row md:gap-[1.3rem] lg:gap-[3rem] md:flex-col">
                  <img
                    className="w-[100px] md:w-[200px]"
                    src={logo}
                    alt="logo"
                  />
                  <Copyright />
                </div>
                <div className=" flex flex-col gap-3 md:gap-0">
                  <Adresse />
                  <SocialMedias />
                </div>
                <div className="w-3/4 h-[1px]  bg-offWhite md:hidden "></div>
                <div className="hidden w-[1px] h-[170px] bg-offWhite md:inline "></div>
                <FooterMenu
                  menu={footer.menu}
                  primaryDomainUrl={header.shop.primaryDomain.url}
                  publicStoreDomain={publicStoreDomain}
                />
              </div>
            )}
          </footer>
        )}
      </Await>
    </Suspense>
  );
}
/**
 * @param {{
 *   menu: FooterQuery['menu'];
 *   primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
 *   publicStoreDomain: string;
 * }}
 */
function FooterMenu({menu, primaryDomainUrl, publicStoreDomain}) {
  return (
    <div className="flex flex-col gap-4 md:gap-9">
      <Subscribe />
      <nav className="footer-menu flex flex-col" role="navigation">
        <a href="#">Conditions générales de vente</a>
        <a href="#">Mentions légales</a>
        <a href="#">Infos pratiques</a>
        {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
          if (!item.url) return null;
          // if the url is internal, we strip the domain
          const url =
            item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
              ? new URL(item.url).pathname
              : item.url;
          const isExternal = !url.startsWith('/');
          return isExternal ? (
            <a
              href={url}
              key={item.id}
              rel="noopener noreferrer"
              target="_blank"
            >
              {item.title}
            </a>
          ) : (
            <NavLink
              end
              key={item.id}
              prefetch="intent"
              style={activeLinkStyle}
              to={url}
            >
              {item.title}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}

function Copyright() {
  return (
    <div className="flex flex-col lg:flex-row gap-2 p-bold">
      <div className="flex gap-2 items-center">
        <p className="p-bold translate-y-0.5">Copyright</p>
        <LuCopyright className="text-l" />
        <span className="text-xl">
          <GetCurrentYear />
        </span>
      </div>
      <p className="p-bold translate-y-0.5">Le Botaniste inc.</p>
    </div>
  );
}

function Adresse() {
  return (
    <div className="flex flex-col -translate-x-3 md:translate-x-0 lg:h-[190px]">
      <h3 className="hidden md:block">Le Botaniste</h3>
      <h6 className="md:hidden">Le Botaniste</h6>
      <div className="flex">
        <a
          href="https://www.google.ca/maps?hl=fr"
          alt="Carte Google du 270, rue des Plantes, Québec (Québec)  G1V 2K6"
          target="_blank"
          className="text-xl"
        >
          270, rue des Plantes
          <br />
          Québec (Québec) G1V 2K6
        </a>
      </div>
      <a href="tel:+14185559876" className="flex items-center gap-3 text-xl">
        <LuPhone />
        418 555-9876
      </a>
      <a
        href="mailto:leboltaniste@gmail.ca"
        target="_blank"
        className="flex items-center gap-3 text-l"
      >
        <FaAt />
        lebotaniste@gmail.ca
      </a>
    </div>
  );
}

function SocialMedias() {
  return (
    <div className="flex items-center -translate-x-3 md:translate-x-0 md:flex-col lg:flex-row gap-3 md:gap-1 lg:gap-6 md:items-baseline">
      <h3 className="hidden md:block">Nous suivre</h3>
      <h6 className="md:hidden">Nous suivre</h6>
      <div className="flex gap-3 md:gap-6 lg:gap-3 justify-between lg:items-center">
        <a
          href="https://www.facebook.com/"
          alt="Facebook Le Botaniste"
          target="_blank"
        >
          <LuFacebook className="text-xl" />
        </a>
        <a
          href="https://www.instagram.com/"
          alt="Instagram Le Botaniste"
          target="_blank"
        >
          <LuInstagram className="text-xl" />
        </a>
        <a
          href="https://www.linkedin.com/home"
          alt="Linkedin Le Botaniste"
          target="_blank"
        >
          <LuLinkedin className="text-xl" />
        </a>
      </div>
    </div>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
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
    color: isPending ? 'grey' : 'white',
  };
}

/**
 * @typedef {Object} FooterProps
 * @property {Promise<FooterQuery|null>} footer
 * @property {HeaderQuery} header
 * @property {string} publicStoreDomain
 */

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
