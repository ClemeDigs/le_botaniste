import Input from './Input';
import {useState} from 'react';

export default function AllInputs() {
  const [allValues, setAllValues] = useState(['hello', 'coucou', 'bonjour']);

  const changeInput = (index, event) => {
    // Copie de `allValues` pour créer un tableau modifiable
    let updatedValues = allValues.slice();

    // Nouvelle valeur saisie par l'utilisateur dans le champ
    let newValue = event.target.value;

    // Remplacer la valeur dans le tableau copié
    updatedValues[index] = newValue;

    // Mettre à jour `allValues` avec le tableau mis à jour
    setAllValues(updatedValues);
  };

  return (
    <div>
      <div>
        {allValues.map((value, index) => (
          <Input
            key={index}
            value={value}
            onInput={(event) => changeInput(index, event)}
          />
        ))}
      </div>
      <p>{allValues.join(' ')}</p>
    </div>
  );
}
