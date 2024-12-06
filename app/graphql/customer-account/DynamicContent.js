export const BANNER_QUERY = `#graphql
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
      image: field(key: "image") {
        reference {
          ... on MediaImage {
            id
            image {
              url
            }
          }
        }
      }
      image_alt: field(key: "image_alt") {
        value
      }
    }
  }
}
`;
