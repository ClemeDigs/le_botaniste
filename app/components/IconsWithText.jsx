import delivery from 'app/assets/delivery.svg';
import paiement from 'app/assets/paiement.svg';
import service from 'app/assets/service.svg';
import IconWithText from './IconWithText';
import Marquee from './Marquee';

/**
 *
 * @returns {React.JSX.Element}
 */
export default function IconsWithText() {
  return (
    <div>
      <Marquee></Marquee>
      <div className="bg-pink flex flex-col items-center p-8 gap-12">
        <h2 className="border-t border-b text-center hidden md:block">
          Nos modalités de commande
        </h2>
        <h3 className="border-t border-b text-center md:hidden">
          Nos modalités de commande
        </h3>
        <div className="flex flex-col md:flex-row gap-10 md:gap-[160px]">
          <IconWithText
            img={paiement}
            title="Paiement sécurisé"
            content="Par carte bancaire ou application mobile"
          />
          <IconWithText
            img={delivery}
            title="Livraison rapide"
            content="Dans tout le Québec"
          />
          <IconWithText
            img={service}
            title="Service 24/7"
            content="Par appel ou par message"
          />
        </div>
      </div>
    </div>
  );
}
