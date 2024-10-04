import { useStaticQuery, graphql } from 'gatsby'

const useSettings = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "settings" } } }
        ) {
          nodes {
            frontmatter {
              site_title
              currency
              language
              pickup_locations {
                location_name
                address
              }
              contact_email
            }
          }
        }
      }
    `
  )

  // Перевіряємо, чи є дані, і повертаємо перші знайдені налаштування
  return allMarkdownRemark.nodes.length > 0
    ? allMarkdownRemark.nodes[0].frontmatter
    : null
}

export default useSettings
