import {useLoaderData} from '@remix-run/react';
import PageTitle from '~/components/PageTitle';

export async function loader({context}) {
  const data = await context.storefront.query(PARTNERS_QUERY);
  return {partners: data.metaobjects.nodes};
}

export default function OurPartners() {
  const {partners} = useLoaderData();

  return (
    <div className="py-8">
      <PageTitle title="Nos partenaires" />
      <div className="max-w-[1600px] m-auto mt-8 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 justify-items-center">
        {partners.map(({id, logo, name}) => (
          <figure
            className="grid grid-rows-2 gap-4 border-8 border-dark-green rounded-lg w-[300px] h-[300px]"
            key={id}
          >
            <img
              className="w-[200px] justify-self-center align-self-center m-auto"
              src={logo.reference.image.url}
              alt={'logo de ' + name.value}
            />
            <figcaption className="font-heading-serif font-bold text-xl bg-dark-green text-white w-full h-full p-4 text-center content-center">
              {name.value}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

const PARTNERS_QUERY = `#graphql
query partners {
  metaobjects(first: 250, type: "Partners") {
    nodes {
      id
      logo: field(key: "logo") {
        reference {
          ... on MediaImage {
            id
            image {
              url
            }
          }
        }
      }
      name: field(key: "name") {
        value
      }
    }
  }
}
`;
