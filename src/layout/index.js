import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import useSiteMetaQuery from '../hooks/useSiteMetaQuery'
import Sidebar from '../components/Sidebar'

const Layout = ({ children }) => {
  const siteMetadata = useSiteMetaQuery()

  return (
    <>
      <Helmet
        title={siteMetadata.title}
        meta={[
          {
            name: 'description',
            content: 'Add your website description...',
          },
          {
            name: 'keywords',
            content: 'SiteName, bestsite, ..',
          },
        ]}
      >
        <html lang='en' />
      </Helmet>
      <Sidebar />
      <main className='container top-margin'>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
