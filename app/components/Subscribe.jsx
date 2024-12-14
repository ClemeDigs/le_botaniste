import {useState} from 'react';
import {LuSend, LuMail} from 'react-icons/lu';

/**
 *
 * @param {Object} props - Propriétés du composant.
 * @returns {React.JSX.Element}
 */
export default function Subscribe() {
  /**
   * @type {string}
   */
  const [email, setEmail] = useState('');
  /**
   * @type {boolean}
   */
  const [successMessage, setsuccessMessage] = useState(false);
  /**
   * @type {string}
   */
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * @param {React.FormEvent<HTMLFormElement>} e
   * @returns {void}
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.includes('@')) {
      setsuccessMessage(true);
      setErrorMessage('');
      setEmail('Merci de votre inscription!');
    } else {
      setErrorMessage("L'adresse courriel doit contenir un @.");
      setsuccessMessage(false);
      setEmail('');
    }
  };

  return (
    <div className="flex flex-col">
      <h3 className="hidden md:block">Infolettre</h3>
      <h6 className="md:hidden">Infolettre</h6>
      <div className="flex gap-3 items-center text-xl pb-1">
        <LuMail />
        <p>Inscris-toi à notre infolettre!</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center">
          <label htmlFor="email "></label>
          <input
            type="email"
            id="email"
            label="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value); // Met à jour l'état avec la saisie utilisateur
              if (successMessage) setSuccessMessage(false); // Réinitialise le message de succès
            }}
            placeholder={!successMessage ? 'Adresse courriel' : ''}
            className={`md:w-[230px] lg:w-[250px] p-2 border-2 rounded-full text-dark-green
              ${
                successMessage
                  ? 'bg-pink text-dark-green text-center'
                  : 'bg-offWhite placeholder-dark-green border-pink'
              }
              `}
          />
          {!successMessage && (
            <button
              type="submit"
              className="relative lg: flex items-center justify-center text-dark-green hover:text-dark-green text-2xl"
            >
              <span className="text-xl absolute right-2">
                <LuSend />
              </span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
