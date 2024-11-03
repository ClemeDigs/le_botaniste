import {Link, Links} from '@remix-run/react';

export default function Navigation() {
  return (
    <div>
      <ul className="flex flex-row gap-3">
        <li>
          <Link to="faq">Accueil</Link>
        </li>
        <li>
          <Link to="faq">Catalogue</Link>
        </li>
        <li>
          <Link to="faq">Blog</Link>
        </li>
        <li>
          <Link to="faq">FAQ</Link>
        </li>
        <li>
          <Link to="faq">Contact</Link>
        </li>
      </ul>
    </div>
  );
}
