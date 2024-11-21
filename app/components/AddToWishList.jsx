import {TbHeartPlus} from 'react-icons/tb';
import {TbHeartFilled} from 'react-icons/tb';
import {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

export default function AddToWishList({
  productId,
  className,
  onToggleFavorite,
}) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const wishlisted = getWishListed();
    setIsActive(wishlisted[productId] === true);
  }, [productId]);

  function getWishListed() {
    return JSON.parse(Cookies.get('wishlisted') || '{}');
  }

  function setWishListed(wishlisted) {
    Cookies.set('wishlisted', JSON.stringify(wishlisted), {
      expires: 31,
      sameSite: 'strict',
    });
  }

  function onAdd(e) {
    e.preventDefault();
    const wishlisted = getWishListed();

    wishlisted[productId] = true;

    setWishListed(wishlisted);
    setIsActive(true);

    if (onToggleFavorite) {
      onToggleFavorite(productId, true);
    }
  }

  function onRemove(e) {
    e.preventDefault();
    const wishlisted = getWishListed();

    delete wishlisted[productId];

    setWishListed(wishlisted);
    setIsActive(false);

    if (onToggleFavorite) {
      onToggleFavorite(productId, false);
    }
  }

  return isActive ? (
    <button
      className={`${className} cursor-pointer text-pink`}
      onClick={onRemove}
    >
      <TbHeartFilled />
    </button>
  ) : (
    <button
      className={`${className} cursor-pointer  text-pink`}
      onClick={onAdd}
    >
      <TbHeartPlus />
    </button>
  );
}
