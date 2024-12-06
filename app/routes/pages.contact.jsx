import PageTitle from '~/components/PageTitle';
import InputField from '~/components/InputField';
import {useLoaderData} from '@remix-run/react';
import {useState} from 'react';
import {AiOutlineUser} from 'react-icons/ai';
import {
  LuMail,
  LuPhone,
  LuPenLine,
  LuSend,
  LuAtSign,
  LuMapPin,
} from 'react-icons/lu';
import googlemap from '~/assets/googlemap.png';

export async function loader({context}) {
  const data = await context.storefront.query(HORAIRE_QUERY);
  return {horaires: data?.metaobjects?.nodes || []};
}

export default function Contact() {
  const {horaires = []} = useLoaderData() || {};
  if (horaires.length === 0) {
    console.log('Aucun horaire disponible.');
  }
  // État pour les champs du formulaire
  const [inputValue, setInputValue] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  // Fonction pour gérer les changements
  const handleChange = (e) => {
    const {name, value} = e.target;

    if (!value.trim()) {
      return;
    }

    // Validation avec regex pour certains champs
    let isValid = true;

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Vérifie un format email valide
      isValid = emailRegex.test(value);
    } else if (name === 'phone') {
      const phoneRegex = /^[1-9]\d{2}-\d{3}-\d{4}/; // Vérifie un numéro de 10 chiffres
      isValid = phoneRegex.test(value);
    }

    if (!isValid) {
      return;
    }

    // Met à jour le champ correspondant
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation globale
    if (
      !inputValue.firstname ||
      !inputValue.lastname ||
      !inputValue.email ||
      !inputValue.message
    ) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    alert('Formulaire envoyé avec succès!');
  };
  return (
    <div>
      <PageTitle title="Nous joindre"></PageTitle>
      <div className="flex flex-col md:flex-row justify-center p-[70px] shop-info w-full max-w-[1600px] m-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 bg-dark-green rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl p-6 md:px-[70px] md:py-[50px] justify-end md:w-2/3"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <InputField
              type="text"
              value={inputValue.firstname}
              placeholder="Prénom"
              label="Prénom"
              name="firstname"
              onChange={handleChange}
              icon={<AiOutlineUser />}
            />
            <InputField
              type="text"
              value={inputValue.lastname}
              placeholder="Nom"
              label="Nom"
              name="lastname"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <InputField
              type="email"
              value={inputValue.email}
              placeholder="Courriel"
              label="Email"
              name="email"
              onChange={handleChange}
              icon={<LuMail />}
            />
            <InputField
              type="tel"
              value={inputValue.phone}
              placeholder="Téléphone"
              label="Téléphone"
              name="phone"
              onChange={handleChange}
              icon={<LuPhone />}
            />
          </div>

          <div className="flex flex-col flex-2 gap-6">
            <InputField
              type="text"
              value={inputValue.subject}
              placeholder="Sujet"
              label="Sujet"
              name="subject"
              onChange={handleChange}
            />
            <InputField
              type="textarea"
              value={inputValue.message}
              placeholder="Votre message"
              label="Message"
              name="message"
              cols="30"
              rows="10"
              onChange={handleChange}
              icon={<LuPenLine />}
            />
          </div>
          <fieldset className="flex justify-end">
            <label id="sumit">
              <button
                type="submit"
                className="flex gap-2 items-center bg-pink rounded-full text-offwhite px-4 py-2 w-min"
              >
                Envoyer
                <LuSend />
              </button>
            </label>
          </fieldset>
        </form>
        <div className="shop-location bg-offWhite rounded-r-2xl p-6 md:p-[70px] md:w-1/3">
          <div className="">
            <h2>Notre boutique </h2>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+14185559876"
                className="flex flex-col md:flex-row items-center gap-3 md:px-10"
              >
                <LuPhone />
                <h6>418 555-9876</h6>
              </a>
              <a
                href="mailto:leboltaniste@gmail.ca"
                target="_blank"
                className="flex flex-col md:flex-row items-center gap-3 md:px-10"
              >
                <LuAtSign />
                <h6>lebotaniste@gmail.ca</h6>
              </a>
              <a
                href="https://www.google.ca/maps?hl=fr"
                alt="Carte Google du 270, rue des Plantes, Québec (Québec)  G1V 2K6"
                target="_blank"
                className="flex flex-col md:flex-row items-center md:items-start gap-3 md:px-10"
              >
                <LuMapPin className="translate-y-2" />
                <h6>
                  270, rue des Plantes
                  <br />
                  Québec (Québec) G1V 2K6
                </h6>
              </a>
            </div>
            <div className="flex justify-center p-3">
              <img
                src={googlemap}
                alt="Carte Google du 270, rue des Plantes, Québec (Québec)  G1V 2K6"
                className="w-[200px]"
              />
            </div>
          </div>
        </div>
        <div className="shop-hour">
          {horaires.map((horaire) => (
            <div key={horaire.id}>
              <p>{horaire.jour?.value || 'Jour inconnu'}</p>
              <p>{horaire.debut?.value || 'Heure de début non définie'}</p>
              <p>{horaire.fin?.value || 'Heure de fin non définie'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const HORAIRE_QUERY = `#graphql
  query horaires {
    metaobjects(first: 10, type: "horaire") {
      nodes {
        id
        jour: field(key: "jour") {
          value
        }
        debut: field(key: "debut") {
          value
        }
        fin: field(key: "fin") {
          value
        }
      }
    }
  }
`;
