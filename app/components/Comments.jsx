import {useState} from 'react';
import {RiH3} from 'react-icons/ri';

export default function ProductComments({commentsJson, productId}) {
  const [comments, setComments] = useState(JSON.parse(commentsJson || '[]'));
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Formulaire soumis');
    console.log('Texte du commentaire :', newComment);
    console.log('Auteur :', author);

    const newCommentData = {
      text: newComment,
      author: author || 'Anonyme',
      date: new Date().toISOString(),
    };

    console.log('Données à envoyer :', newCommentData);

    try {
      const response = await fetch('/api/add-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          comment: newCommentData,
        }),
      });

      console.log('Réponse du serveur :', response);

      if (!response.ok) {
        const errorData = await response.json().catch(() => {
          console.error('Réponse non-JSON reçue');
          throw new Error(`Erreur HTTP : ${response.status}`);
        });
        console.error('Erreur côté serveur :', errorData);
        return;
      }

      const responseData = await response.json();
      console.log('Commentaire ajouté côté serveur :', responseData);

      setComments((prev) => [...prev, newCommentData]);
      setNewComment('');
      setAuthor('');
    } catch (error) {
      console.error('Erreur réseau ou autre :', error);
    }
  };

  return (
    <div className="p-4 w-3/4 m-auto">
      <h3 className="">Commentaires</h3>

      <ul className="mb-4">
        {comments.length === 0 ? (
          <li>Aucun commentaire.</li>
        ) : (
          comments.map((comment, index) => (
            <li key={index} className="border-b py-2">
              <p>{comment.text}</p>
              <p>
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
