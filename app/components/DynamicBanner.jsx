import {LuChevronLeft, LuChevronRight} from 'react-icons/lu';
import {useState, useEffect} from 'react';
import {Link} from '@remix-run/react';

export default function DynamicBanner({contents = []}) {
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      incIndex();
    }, 3000);

    // Nettoie l'intervalle lors du démontage du composant
    return () => clearInterval(intervalId);
  }, []);

  function decIndex() {
    setBannerIndex(function (prevIndex) {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        return contents.length - 1;
      }
    });
  }

  function incIndex() {
    setBannerIndex(function (prevIndex) {
      if (prevIndex < contents.length - 1) {
        return prevIndex + 1;
      } else {
        return 0;
      }
    });
  }

  return (
    <div className="flex gap-4 p-4 items-center">
      <button
        className="bg-dark-green text-offWhite rounded-full p-3"
        onClick={decIndex}
      >
        <LuChevronLeft size={24} />
      </button>
      <div className="grid md:grid-cols-2">
        <div className="bg-pink p-4 items-center flex flex-col gap-6 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
          <h3>{contents[bannerIndex].title}</h3>
          <p>{contents[bannerIndex].text}</p>
          <Link
            className="bg-dark-green text-offWhite rounded-full py-3 px-6"
            to={contents[bannerIndex].button.link}
          >
            {contents[bannerIndex].button.text}
          </Link>
        </div>
        <div>
          <img
            className="rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none"
            src={contents[bannerIndex].image}
            alt={contents[bannerIndex].title}
          />
        </div>
      </div>
      <button
        className="bg-dark-green text-offWhite rounded-full p-3"
        onClick={incIndex}
      >
        <LuChevronRight size={24} />
      </button>
    </div>
  );
}
