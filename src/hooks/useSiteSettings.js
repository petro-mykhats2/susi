import { useStaticQuery, graphql } from 'gatsby'

const useSiteSettings = () => {
  const {
    siteSettings: {
      edges: [
        {
          node: { frontmatter },
        },
      ],
    },
  } = useStaticQuery(graphql`
    query {
      siteSettings: allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "settings" } } }
      ) {
        edges {
          node {
            frontmatter {
              pickup_locations {
                location_name
                address
              }
              currency
              language
              site_title
              contact_email
              title
              deliveryInformation
              paymentInformation
            }
          }
        }
      }
    }
  `)

  return frontmatter // Повертаємо всі властивості frontmatter
}

export default useSiteSettings
