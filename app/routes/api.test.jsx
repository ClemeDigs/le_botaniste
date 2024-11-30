// app/routes/api.test.jsx
export const action = async ({request}) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({error: 'Method Not Allowed'}), {
      status: 405,
      headers: {'Content-Type': 'application/json'},
    });
  }

  // Traitez les données ici
  const data = await request.json();
  console.log('Données reçues :', data);

  return new Response(JSON.stringify({message: 'Success'}), {
    status: 200,
    headers: {'Content-Type': 'application/json'},
  });
};
