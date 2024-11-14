import {TbHeartPlus} from 'react-icons/tb';
import {TbHeartFilled} from 'react-icons/tb';
import {useState, useEffect} from 'react';

export default function AddToWishList({className, productId}) {
  const [like, setLike] = useState(false);

  useEffect(() => {
    const storedLiked = localStorage.getItem(`liked-${productId}`);
    setLike(storedLiked ? JSON.parse(storedLiked) : false);
  }, [productId]);

  function toggleLike(e) {
    e.preventDefault();
    const newLikeStatus = !like;
    setLike(newLikeStatus);
    localStorage.setItem(`liked-${productId}`, JSON.stringify(newLikeStatus));
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
