import {useState, useEffect} from 'react';

export default function ProductComments({productId}) {
  // Charger les commentaires globaux depuis localStorage
  const [allComments, setAllComments] = useState(() => {
    const storedComments = localStorage.getItem('allComments');
    return storedComments ? JSON.parse(storedComments) : [];
  });

  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');

  // Filtrer les commentaires pour ce produit
  const comments = allComments.filter(
    (comment) => comment.productId === productId,
  );

  // Sauvegarder tous les commentaires dans localStorage à chaque mise à jour
  useEffect(() => {
    localStorage.setItem('allComments', JSON.stringify(allComments));
  }, [allComments]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      alert('Le commentaire ne peut pas être vide.');
      return;
    }

    const newCommentData = {
      productId, // Associe le commentaire à ce produit
      text: newComment,
      author: author || 'Anonyme',
      date: new Date().toISOString(),
    };

    // Ajouter le nouveau commentaire au tableau global
    setAllComments((prevComments) => [...prevComments, newCommentData]);

    // Réinitialiser les champs du formulaire
    setNewComment('');
    setAuthor('');
  };

  return (
    <div className="p-4 w-3/4 m-auto">
      <h3 className="font-bold text-lg">Commentaires</h3>

      <ul className="mb-4">
        {comments.length === 0 ? (
          <li>Aucun commentaire.</li>
        ) : (
          comments.map((comment, index) => (
            <li key={index} className="border-b py-2">
              <p>{comment.text}</p>
              <p className="text-sm text-gray-500">
                {comment.author}, {new Date(comment.date).toLocaleString()}
              </p>
            </li>
          ))
        )}
      </ul>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
        <input
          type="text"
          placeholder="Votre nom"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Ajoutez un commentaire"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border p-2 rounded"
          rows="3"
        ></textarea>
        <button
          type="submit"
          className="bg-dark-green text-offWhite py-3 px-6 rounded-full"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}
