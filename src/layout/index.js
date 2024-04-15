import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import useSiteMetaQuery from '../hooks/useSiteMetaQuery'
import Sidebar from '../components/Sidebar'

const Layout = ({ children }) => {
  const siteMetadata = useSiteMetaQuery()
  console.log('siteMetadata', siteMetadata)

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
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1, maximum-scale=1',
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
