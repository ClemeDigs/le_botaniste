import delivery from 'app/assets/delivery.svg';
import paiement from 'app/assets/paiement.svg';
import service from 'app/assets/service.svg';

export default function PreFooter() {
  return (
    <div className="bg-pink flex flex-col items-center p-8 gap-12">
      <h2 className="border-t border-b">Nos modalités de commande</h2>
      <div className="flex gap-[160px]">
        <Avantages
          img={paiement}
          title="Paiement sécurisé"
          content="Par carte bancaire ou application mobile"
        />
        <Avantages
          img={delivery}
          title="Livraison rapide"
          content="Dans tout le Québec"
        />
        <Avantages
          img={service}
          title="Service 24/7"
          content="Par appel ou par message"
        />
      </div>
    </div>
  );
}

function Avantages({img, title, content}) {
  return (
    <div className="flex flex-col max-w-[180px] gap-6 items-center">
      <img className="" src={img} alt={title} />
      <h3 className="text-center">{title}</h3>
      <p className="text-center">{content}</p>
    </div>
  );
}
