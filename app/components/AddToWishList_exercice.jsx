/* import {TbHeartPlus} from 'react-icons/tb';
import {TbHeartFilled} from 'react-icons/tb';
import {useState, useEffect} from 'react';

export default function AddToWishList2({className, productId}) {
  const [like, setLike] = useState(false);

  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem('favoriteProducts')) || [];
    setLike(storedFavorites.includes(productId));
  }, [productId]);

  function toggleLike(e) {
    e.preventDefault();
    let storedFavorites =
      JSON.parse(localStorage.getItem('favoriteProducts')) || [];

    if (!like) {
      storedFavorites.push(productId);
    } else {
      storedFavorites = storedFavorites.filter((id) => id !== productId);
    }

    setLike(!like);
    localStorage.setItem('favoriteProducts', JSON.stringify(storedFavorites));
  }

  return (
    <button
      onClick={toggleLike}
      className={`${className} text-pink cursor-pointer`}
    >
      {like ? <TbHeartFilled /> : <TbHeartPlus />}
    </button>
  );
}
 */
