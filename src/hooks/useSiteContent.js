import { graphql, useStaticQuery } from 'gatsby'

const useSiteContent = () => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(
        frontmatter: {
          templateKey: { eq: "siteSettings" }
          page: { eq: "siteContent" }
        }
      ) {
        html
      }
    }
  `)

  return data.markdownRemark.html
}

export default useSiteContent
