import InputField from '~/components/InputField';
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
import {useLoaderData} from '@remix-run/react';

// export async function loader({context}) {
//   const data = await context.storefront.query(HORAIRE_QUERY);
//   return {horaires: data.metaobjects.nodes};
// }

export async function loader({context}) {
  try {
    const data = await context.storefront.query(HORAIRE_QUERY);
    console.log(data);

    if (!data?.metaobjects?.nodes) {
      throw new Error('Aucune donnée horaire trouvée.');
    }
    return {horaire: data.metaobjects.nodes};
  } catch (error) {
    console.error('Erreur lors du chargement des horaires :', error);
    return {horaire: []};
  }
}

// export default function AddContactForm() {
//   const {horaire} = useLoaderData();

export default function AddContactForm() {
  const {horaire = []} = useLoaderData() || {}; // Si `useLoaderData` retourne null, utilisez un objet vide
  console.log(horaire);
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
      console.log(`Le champ ${name} ne peut pas être vide.`);
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
      console.log(`Invalid value for ${name}: ${value}`);
      return; // Ne met pas à jour si la valeur est invalide
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

    console.log('Form submitted:', inputValue);
    alert('Formulaire envoyé avec succès!');
  };

  return (
    <div className="flex p-[70px] shop-info w-[90%]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-dark-green rounded-l-2xl px-[70px] py-[50px] justify-end"
      >
        <div className="flex gap-6">
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
        <div className="flex gap-6">
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
      <div className="shop-location bg-offWhite rounded-r-2xl p-[70px]">
        <div className="">
          <h2>Notre boutique </h2>
          <div className="flex flex-col gap-3">
            <a
              href="tel:+14185559876"
              className="flex items-center gap-3 px-10"
            >
              <LuPhone />
              <h6>418 555-9876</h6>
            </a>
            <a
              href="mailto:leboltaniste@gmail.ca"
              target="_blank"
              className="flex items-center gap-3 px-10"
            >
              <LuAtSign />
              <h6>lebotaniste@gmail.ca</h6>
            </a>
            <a
              href="https://www.google.ca/maps?hl=fr"
              alt="Carte Google du 270, rue des Plantes, Québec (Québec)  G1V 2K6"
              target="_blank"
              className="flex items-start gap-3 px-10"
            >
              <LuMapPin className="translate-y-2" />
              <h6>
                270, rue des Plantes
                <br />
                Québec (Québec) G1V 2K6
              </h6>
            </a>
          </div>
          <div className="flex justify-center">
            <img
              src={googlemap}
              alt="Carte Google du 270, rue des Plantes, Québec (Québec)  G1V 2K6"
              className="w-[200px]"
            />
          </div>
        </div>
      </div>
      <div className="shop-hour">
        {horaire.map((heures) => (
          <div key={heures.id}>
            <p>{heures.jour?.value || 'Jour inconnu'}</p>
            <p>{heures.debut?.value || 'Heure de début non définie'}</p>
            <p>{heures.fin?.value || 'Heure de fin non définie'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const HORAIRE_QUERY = `#graphql
  query horaire {
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
