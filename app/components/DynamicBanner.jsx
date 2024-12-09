import {LuChevronLeft, LuChevronRight} from 'react-icons/lu';
import {useState, useEffect} from 'react';
import {Link} from '@remix-run/react';

export default function DynamicBanner({contents = []}) {
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBannerIndex((prevIndex) =>
        prevIndex >= contents.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000);

    // Nettoie l'intervalle lors du démontage du composant
    return () => clearInterval(intervalId);
  }, [contents.length]); // Ajout de `contents.length` comme dépendance

  function decIndex() {
    setBannerIndex((prevIndex) =>
      prevIndex <= 0 ? contents.length - 1 : prevIndex - 1,
    );
  }

  function incIndex() {
    setBannerIndex((prevIndex) =>
      prevIndex >= contents.length - 1 ? 0 : prevIndex + 1,
    );
  }

  return (
    <div className="flex gap-4 p-4 items-center max-w-[1600px] m-auto h-[800px] md:max-h-[550px] overflow-hidden">
      <button
        className="bg-dark-green text-offWhite rounded-full p-2 lg:p-3"
        onClick={decIndex}
      >
        <LuChevronLeft size={24} />
      </button>
      <div className="relative w-full">
        {contents.map((content, i) => (
          <div
            key={content.title.value}
            className={`transition-all duration-700 w-full grid md:grid-cols-2 ${
              i === bannerIndex
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-[-50px]'
            } ${i !== 0 ? 'absolute top-0 left-0' : ''}`}
          >
            <div className="bg-pink md:h-[400px] lg:h-[350px] xl:h-[400px] p-4 xl:p-8 flex flex-col gap-6 justify-between items-center rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none ">
              <h3>{content.title.value}</h3>
              <p>{content.description.value}</p>
              <Link
                className="bg-dark-green text-offWhite rounded-full py-3 px-6"
                to={content.link_url.value}
              >
                {content.link_label.value}
              </Link>
              <div className="flex justify-between w-full"></div>
            </div>
            <div className="h-full w-full relative transition-all duration-700 md:h-[400px] lg:h-[350px] xl:h-[400px]">
              <img
                className="rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none h-full w-full object-cover"
                src={content.image.reference.image.url}
                alt={content.image_alt.value}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        className="bg-dark-green text-offWhite rounded-full p-2 lg:p-3"
        onClick={incIndex}
      >
        <LuChevronRight size={24} />
      </button>
    </div>
  );
}
