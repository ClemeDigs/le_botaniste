import PageTitle from '~/components/PageTitle';
import {useEffect} from 'react';

export default function Quiz() {
  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({key: 'value'}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div>
      <PageTitle title="Quiz"></PageTitle>
      <div className="p-8 max-w-[1600px] m-auto">
        <h2>Quelle plante est faite pour toi?</h2>
      </div>
    </div>
  );
}
