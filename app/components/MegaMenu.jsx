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
        <div>
          <span className="group-focus-within:underline group-hover:underline font-medium cursor-pointer">
            {menuItem.title}
          </span>
          <ul className="absolute left-[-15px] top-full rounded-b-full bg-pink pt-4 pb-6 transition duration-300 opacity-0 group-hover:opacity-100 flex group-focus-within:opacity-100 shadow-2xl min-w-[120px] flex-col items-center">
            {menuItem.items.map((subItem, index) => (
              <MenuItem key={index} menuItem={subItem} />
            ))}
          </ul>
        </div>
      ) : (
        <a href={url} className="font-bold">
          {menuItem.title}
        </a>
      )}
    </li>
  );
}
