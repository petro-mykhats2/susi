import { graphql, useStaticQuery } from 'gatsby'

const useSiteContent = () => {
  const data = useStaticQuery(graphql`
    query AllSiteContentQuery {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "siteSettings" } } }
      ) {
        edges {
          node {
            frontmatter {
              title
            }
            html
          }
        }
      }
    }
  `)

  return data.allMarkdownRemark.edges.map(({ node }) => ({
    title: node.frontmatter.title,
    html: node.html,
  }))
}

export default useSiteContent
