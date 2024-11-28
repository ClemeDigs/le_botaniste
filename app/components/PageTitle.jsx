import mosaique from 'app/assets/mosaique_double.svg';

export default function PageTitle({title}) {
  return (
    <div className="w-full flex items-center bg-offWhite shadow-xl gap-4 h-[80px] lg:h-[120px]">
      <div className="flex-1 h-full hidden md:inline-block">
        <img
          className="h-full w-full object-cover"
          src={mosaique}
          alt="Motifs"
          aria-hidden
        />
      </div>

      <div className="ml-4 md:m-0">
        <h1 className="flex-none text-dark-green">{title}</h1>
      </div>

      <div className="flex-1 h-full">
        <img
          className="h-full w-full object-cover"
          src={mosaique}
          alt="Motifs"
          aria-hidden
        />
      </div>
    </div>
  );
}
