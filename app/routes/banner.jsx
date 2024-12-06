import DynamicBanner from '~/components/DynamicBanner';
import {useLoaderData} from '@remix-run/react';

export async function loader({context}) {
  const data = await context.storefront.query(BANNER_QUERY);

  if (data && data.metaobjects && data.metaobjects.nodes) {
    return {dynamicContent: data?.metaobjects?.nodes ?? []};
  }
}

export default function banner() {
  const {dynamicContent} = useLoaderData();
  return (
    <div>
      <DynamicBanner contents={dynamicContent}></DynamicBanner>
    </div>
  );
}

const BANNER_QUERY = `#graphql
query dynamicContent {
  metaobjects(first: 250, type: "dynamic_content") {
    nodes {
      id
      title: field(key: "title") {
        value
      }
      description: field(key: "description") {
        value
      }
      link_label: field(key: "link_label") {
        value
      }
      link_url: field(key: "link_url") {
        value
      }
    }
  }
}
`;
