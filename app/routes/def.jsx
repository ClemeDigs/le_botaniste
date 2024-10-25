import {Button} from '~/components/Button';
import {Link} from '@remix-run/react';

export default function Def() {
  return (
    <>
      <h1>DEF</h1>
      <Button
        content="DEF"
        className="w-full"
        onClick={() => {
          alert('test');
        }}
      ></Button>
      <Link to="/abc">Abc</Link>
    </>
  );
}
