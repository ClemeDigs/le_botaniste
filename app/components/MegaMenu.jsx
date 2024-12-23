/**
 *
 * @param {Object} props - Propriétés du composant.
 * @param {{ url: string, title: string, items?: { url: string, title: string, items?: any[] }[] }} props.menuItem
 * @param {string} props.primaryDomainUrl
 * @param {string} props.publicStoreDomain
 * @returns {React.JSX.Element}
 */
export default function MegaMenu({
  menuItems,
  primaryDomainUrl,
  publicStoreDomain,
}) {
  return (
    <nav className="hidden md:flex">
      <ul className="flex">
        {menuItems.map((menuItem, index) => (
          <MenuItem key={index} menuItem={menuItem} />
        ))}
      </ul>
    </nav>
  );
}

function MenuItem({menuItem}) {
  const url =
    menuItem.url.includes('myshopify.com') ||
    menuItem.url.includes(publicStoreDomain) ||
    menuItem.url.includes(primaryDomainUrl)
      ? new URL(menuItem.url).pathname
      : menuItem.url;
  return (
    <li className="px-3 py-4 group relative text-center">
      {menuItem.items && menuItem.items.length > 0 ? (
        <>
          <span className="group-focus-within:underline group-hover:underline font-medium cursor-pointer">
            {menuItem.title}
          </span>
          <ul className="absolute left-[-15px] top-full rounded-b-full bg-pink pt-4 pb-6 transition duration-300 invisible opacity-0 group-hover:visible group-hover:opacity-100 flex group-focus-within:visible group-focus-within:opacity-100 shadow-2xl min-w-[120px] flex-col items-center">
            {menuItem.items.map((subItem, index) => (
              <MenuItem key={index} menuItem={subItem} />
            ))}
          </ul>
        </>
      ) : (
        <a href={url} className="font-bold">
          {menuItem.title}
        </a>
      )}
    </li>
  );
}
