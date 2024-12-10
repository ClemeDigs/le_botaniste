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
    userEmail: '',
    phone: '',
    subject: '',
    message: '',
  });

  // Ancienne fonction pour gérer les changements
  // const handleChange = (e) => {
  //   const {name, value} = e.target;

  //   // Met à jour le champ correspondant
  //   setInputValue((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // Fonction pour gérer les changements
  const handleChange = (e) => {
    const {name, value} = e.target;

    // Appliquer une transformation pour le champ téléphone
    let formattedValue = value;
    if (name === 'phone') {
      formattedValue = formatPhoneInput(value);
    }

    // Met à jour le champ correspondant
    setInputValue((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  // Validation avec regex pour certains champs
  // let isValid = true;

  // if (name === 'email') {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Vérifie un format email valide
  //   isValid = emailRegex.test(value);
  // } else if (name === 'phone') {
  //   const phoneRegex =
  //     /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/; // Vérifie un numéro de 10 chiffres
  //   isValid = phoneRegex.test(value);
  // }

  // if (!isValid) {
  //   console.log(`Invalid value for ${name}: ${value}`);
  //   return; // Ne met pas à jour si la valeur est invalide
  // }

  const validateField = (name, value) => {
    if (name === 'userEmail') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) || 'Adresse email invalide.';
    } else if (name === 'phone') {
      const phoneRegex =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      return phoneRegex.test(value) || 'Numéro de téléphone invalide.';
    }
    return true;
  };

  const formatPhoneInput = (input) => {
    // Retirer tous les caractères non numériques
    const digits = input.replace(/\D/g, '');

    // Vérifier si le nombre de chiffres est suffisant pour formater
    if (digits.length === 10) {
      // Appliquer le format (123) 456-7890
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length === 11 && digits.startsWith('1')) {
      // Format pour un numéro avec indicatif pays (USA/Canada)
      return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(
        7,
      )}`;
    }

    // Retourner la saisie brute si elle n'est pas formatable
    return input;
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation globale
    if (
      !inputValue.firstname ||
      !inputValue.lastname ||
      !inputValue.userEmail ||
      !inputValue.message
    ) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    console.log('Form submitted:', inputValue);
    alert('Formulaire envoyé avec succès!');
  };

  return (
    <div>
      <PageTitle title="Nous joindre"></PageTitle>
      <div className="shop-info flex flex-col md:flex-row justify-center p-2 md:p-6 lg:p-16 m-auto">
        <form
          onSubmit={handleSubmit}
          id="contact-form"
          autoComplete="off"
          method="get"
          target="self"
          className="flex flex-col gap-6 bg-dark-green p-10 rounded-t-2xl md:rounded-l-2xl md:rounded-r-none md:p-6 lg:px-[70px] md:py-[50px] justify-end md:w-1/2 lg:w-2/3"
        >
          <div className="flex flex-col justify-between lg:flex-row gap-6">
            <InputField
              type="text"
              value={inputValue.firstname}
              id="firstname"
              placeholder="Prénom"
              label="Prénom"
              name="firstname"
              autocomplete="off"
              onChange={handleChange}
              icon={<AiOutlineUser />}
            />
            <InputField
              type="text"
              value={inputValue.lastname}
              id="lastname"
              placeholder="Nom"
              label="Nom"
              name="lastname"
              autocomplete="off"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col justify-between lg:flex-row gap-6">
            <InputField
              type="email"
              value={inputValue.userEmail}
              id="userEmail"
              placeholder="Courriel"
              label="Courriel"
              name="userEmail"
              autocomplete="off"
              onChange={handleChange}
              icon={<LuMail />}
            />
            <InputField
              type="tel"
              value={inputValue.phone}
              id="phone"
              placeholder="Téléphone"
              label="Téléphone"
              name="phone"
              autocomplete="off"
              onChange={handleChange}
              icon={<LuPhone />}
            />
          </div>

          <div className="flex flex-col flex-2 gap-6">
            <InputField
              type="text"
              value={inputValue.subject}
              id="subject"
              placeholder="Sujet"
              label="Sujet"
              name="subject"
              autocomplete="off"
              onChange={handleChange}
            />
            <InputField
              type="textarea"
              value={inputValue.message}
              id="message"
              placeholder="Votre message"
              label="Message"
              name="message"
              cols="30"
              rows="10"
              autocomplete="off"
              onChange={handleChange}
              icon={<LuPenLine />}
            />
          </div>
          <fieldset className="">
            <label id="submit" className="flex justify-end">
              <button
                type="submit"
                className="flex gap-2 items-center bg-pink rounded-full text-offwhite px-4 py-2 translate-4"
              >
                Envoyer
                <LuSend className="text-xl" />
              </button>
            </label>
          </fieldset>
        </form>
        <div className="boutique flex flex-col items-center bg-offWhite rounded-b-2xl border-8 border-dark-green md:rounded-l-none md:rounded-r-2xl md:w-1/2 lg:w-1/3 p-10 md:p-0">
          <h2 className="text-center">Notre boutique</h2>
          <div className="shop-location flex flex-col justify-center gap-3 py-6 md:py-0">
            <a
              href="tel:+14185559876"
              className="flex flex-row items-center gap-3"
            >
              <LuPhone className="text-xl" />
              <h6>418 555-9876</h6>
            </a>
            <a
              href="mailto:leboltaniste@gmail.ca"
              target="_blank"
              className="flex flex-row items-center gap-3"
            >
              <LuAtSign className="text-xl" />
              <h6>lebotaniste@gmail.ca</h6>
            </a>
            <a
              href="https://www.google.com/maps/place/%C3%8Ele+Moukmouk/@48.4515835,-79.272727,16z/data=!3m1!4b1!4m6!3m5!1s0x4d2144aefea832a5:0x37fdb79d619b64d6!8m2!3d48.4517231!4d-79.2543752!16s%2Fg%2F11cjh_z2y6?entry=ttu&g_ep=EgoyMDI0MTIwNC4wIKXMDSoASAFQAw%3D%3D"
              alt="Carte Google du 270, rue des Plantes, Québec (Québec)  G1V 2K6"
              target="_blank"
              className="flex flex-row items-center md:items-start gap-3"
            >
              <LuMapPin className="text-xl translate-y-2" />
              <h6>
                270, rue des Plantes
                <br />
                Québec (Québec) G1V 2K6
              </h6>
            </a>
          </div>
          <div>
            <a
              href="https://www.google.com/maps/place/%C3%8Ele+Moukmouk/@48.4515835,-79.272727,16z/data=!3m1!4b1!4m6!3m5!1s0x4d2144aefea832a5:0x37fdb79d619b64d6!8m2!3d48.4517231!4d-79.2543752!16s%2Fg%2F11cjh_z2y6?entry=ttu&g_ep=EgoyMDI0MTIwNC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              className="map flex justify-center p-3 md:py-12 lg:p-3"
            >
              <img
                src={googlemap}
                alt="Carte Google du 270, rue des Plantes, Québec (Québec)  G1V 2K6"
                className="w-1/2"
              />
            </a>
          </div>
          <div className="shop-hour pt-6 md:p-0">
            <h3 className="text-center">Heures d'ouverture</h3>
            {horaires.map((horaire) => (
              <div
                key={horaire.id}
                className="hours grid grid-cols-2 gap-8 py-1"
              >
                <p className="flex text-right justify-end items-center">
                  {horaire.jour?.value || 'Jour inconnu'}
                </p>
                <div className="flex gap-1 justify-start items-center">
                  <p className="text-right">
                    {horaire.debut?.value || 'Heure de début non définie'}
                  </p>
                  <p>à</p>
                  <p className="text-right">
                    {horaire.fin?.value || 'Heure de fin non définie'}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
