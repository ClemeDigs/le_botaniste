export default function MegaMenu({menuItems}) {
  return (
    <nav>
      <ul className="flex">
        {menuItems.map((menuItem, index) => (
          <MenuItem key={index} menuItem={menuItem} />
        ))}
      </ul>
    </nav>
  );
}

function MenuItem({menuItem}) {
  return (
    <li className="px-3 py-4 group relative text-center">
      {menuItem.items && menuItem.items.length > 0 ? (
        <div>
          <span className="group-focus-within:underline group-hover:underline font-medium cursor-pointer">
            {menuItem.title}
          </span>
          <ul className="absolute left-[-15px] top-full rounded-b-full bg-pink pt-4 pb-6 hidden group-hover:flex group-focus-within:flex shadow-2xl min-w-[120px] flex-col items-center">
            {menuItem.items.map((subItem, index) => (
              <MenuItem key={index} menuItem={subItem} />
            ))}
          </ul>
        </div>
      ) : (
        <a href={menuItem.url} className="font-bold">
          {menuItem.title}
        </a>
      )}
    </li>
  );
}
