import {Button} from '~/components/Button';
import {Link} from '@remix-run/react';

export default function Abc() {
  return (
    <>
      <h1>Abc</h1>
      <Button content="Click me" />
      <Button content="Click me twice" />
      <Link to="/def">Def</Link>
      <a href="https://google.com">Google</a>
    </>
  );
}
