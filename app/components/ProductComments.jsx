import {useEffect, useState} from 'react';

export default function ProductComments({productId}) {
  const [commentText, setCommentText] = useState('');
  const [newName, setNewName] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    const productComments = savedComments.filter(
      (comment) => comment.productId === productId,
    );
    setComments(productComments);
  }, [productId]);

  function addComment(e) {
    e.preventDefault();

    const newComment = {
      productId: productId,
      name: newName || 'Anonyme',
      comment: commentText,
      date: new Date().toISOString(),
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);

    const allComments = JSON.parse(localStorage.getItem('comments')) || [];
    localStorage.setItem(
      'comments',
      JSON.stringify([...allComments, newComment]),
    );

    setCommentText('');
    setNewName('');
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <h3 className="text-dark-green">Commentaires</h3>
      <div className="flex flex-col gap-8 lg:flex-row w-full">
        <ul className="mb-4 w-full lg:w-1/2 bg-offWhite rounded-3xl">
          {comments.length === 0 ? (
            <li>Aucun commentaire sur ce produit.</li>
          ) : (
            comments.map((comment, index) => (
              <li
                key={index}
                className="border-b-2 border-pink py-2 last:border-none"
              >
                <div className="px-4">
                  <p>{comment.comment}</p>
                  <p className="text-dark-green">
                    {comment.name},{' '}
                    {new Date(comment.date).toLocaleDateString()}
                  </p>
                </div>
              </li>
            ))
          )}
        </ul>

        <form
          onSubmit={addComment}
          className="flex flex-col w-full lg:w-1/2 gap-4"
        >
          <div className="flex flex-col">
            <label className="font-bold text-dark-green" htmlFor="nom">
              Nom
            </label>
            <input
              className="bg-offWhite border border-dark-green rounded-full py-2 px-4"
              type="text"
              placeholder="Entre ton nom"
              id="nom"
              name="nom"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-dark-green" htmlFor="commentaire">
              Commentaire
            </label>
            <textarea
              className="bg-offWhite border border-dark-green rounded-4xl py-2 px-4"
              name="commentaire"
              id="commentaire"
              rows={3}
              placeholder="Ajoute un commentaire!"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-dark-green text-offWhite px-6 py-3 rounded-full hover:shadow-lg w-fit m-auto"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
