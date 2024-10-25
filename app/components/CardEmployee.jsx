import {Button} from './Button';
import mailIcon from 'app/assets/mail.svg';

export function CardEmployee({
  profilePicture,
  firstName,
  lastName,
  position,
  age,
  email,
}) {
  return (
    <div className="bg-orange-100 shadow-lg flex flex-col gap-4 items-center max-w-[300px]">
      <img
        className="w-full"
        src={profilePicture}
        alt={`${firstName} ${lastName}`}
      />
      <div className="flex flex-col gap-2 p-4">
        <h2>
          {firstName} {lastName}
        </h2>
        <h3 className=" text-stone-700">{position}</h3>
        <p className=" text-stone-700 italic">{age} ans</p>
        <a className="flex gap-2" href={`mailto:${email}`}>
          <img className="w-[20px]" src={mailIcon} alt="icone mail" />
          Contact
        </a>
        <Button
          content="En savoir plus"
          onClick={() => {
            alert('test');
          }}
        ></Button>
      </div>
    </div>
  );
}
