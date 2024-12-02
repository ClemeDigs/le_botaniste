import {LuTruck} from 'react-icons/lu';

export default function Marquee() {
  return (
    <div className="marquee__container p-2 text-dark-green border-y-4 border-dark-green flex overflow-hidden w-screen">
      <ul className="marquee__list flex gap-8 justify-between items-center shrink-0 min-w-full ">
        <li className="marquee__item">
          Livraison offerte à partir de 60$ d'achat dans tout le Québec
          <LuTruck />
        </li>
        <li className="marquee__item">
          Livraison offerte à partir de 60$ d'achat dans tout le Québec
          <LuTruck />
        </li>
        <li className="marquee__item">
          Livraison offerte à partir de 60$ d'achat dans tout le Québec
          <LuTruck />
        </li>
        <li className="marquee__item">
          Livraison offerte à partir de 60$ d'achat dans tout le Québec
          <LuTruck />
        </li>
        <li className="marquee__item">
          Livraison offerte à partir de 60$ d'achat dans tout le Québec
          <LuTruck />
        </li>
      </ul>

      <ul
        aria-hidden="true"
        className="marquee__list flex gap-8 justify-between items-center shrink-0 min-w-full"
      >
        <li className="marquee__item">
          Livraison offerte à partir de 60$ d'achat dans tout le Québec
          <LuTruck />
        </li>
        <li className="marquee__item">
          Livraison offerte à partir de 60$ d'achat dans tout le Québec
          <LuTruck />
        </li>
        <li className="marquee__item">
          Livraison offerte à partir de 60$ d'achat dans tout le Québec
          <LuTruck />
        </li>
        <li className="marquee__item">
          Livraison offerte à partir de 60$ d'achat dans tout le Québec
          <LuTruck />
        </li>
        <li className="marquee__item">
          Livraison offerte à partir de 60$ d'achat dans tout le Québec
          <LuTruck />
        </li>
      </ul>
    </div>
  );
}
