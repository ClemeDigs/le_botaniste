import mosaique from 'app/assets/mosaique_double.svg';

export default function PageTitle({title, className}) {
  return (
    <div
      className={`w-full flex flex-col md:flex-row items-center bg-offWhite shadow-xl gap-3 h-[200px] md:h-[80px] lg:h-[120px] ${className}`}
    >
      <div className="flex-1 md:h-full h-1/2 flex">
        <img
          className="w-full object-cover overflow-hidden h-full"
          src={mosaique}
          alt="Motifs"
          aria-hidden
        />
        <img
          className="w-full object-cover overflow-hidden h-full md:hidden"
          src={mosaique}
          alt="Motifs"
          aria-hidden
        />
      </div>

      <div className="ml-4 md:m-0">
        <h1 className="text-center flex-none text-dark-green">{title}</h1>
      </div>

      <div className="flex-1 h-full hidden md:inline-block">
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
