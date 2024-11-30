export async function action({request, context}) {
  console.log('Requête reçue pour /api/add-comment');

  try {
    const body = await request.json();
    console.log('Corps de la requête :', body);

    const {productId, comment} = body;

    if (!productId || !comment) {
      console.error('Données manquantes : productId ou comment');
      return json({error: 'Invalid input'}, {status: 400});
    }

    const updatedComments = JSON.stringify([comment]); // Formatez les commentaires en JSON

    const mutation = `#graphql
      mutation AddComment($input: MetafieldInput!) {
        metafieldUpsert(input: $input) {
          metafield {
            id
            namespace
            key
            value
            type
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const response = await context.storefront.mutate(mutation, {
      variables: {
        input: {
          namespace: 'custom',
          key: 'comments',
          value: updatedComments,
          type: 'json',
          ownerId: productId,
        },
      },
    });

    console.log('Résultat de la mutation :', response);

    if (response.metafieldUpsert?.userErrors?.length) {
      console.error('Erreurs Shopify :', response.metafieldUpsert.userErrors);
      return json(
        {error: 'Shopify error', details: response.metafieldUpsert.userErrors},
        {status: 500},
      );
    }

    return json({success: true, comments: updatedComments}, {status: 200});
  } catch (error) {
    console.error('Erreur côté serveur :', error);
    return json({error: 'Internal Server Error'}, {status: 500});
  }
}
