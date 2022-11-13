import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import useSiteMetaQuery from '../hooks/useSiteMetaQuery'

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
      <div className='header'>
        <div className='header container'>
          <div className='header-logo'>Logo</div>
          <div className='header-menu'>
            <div className='header-menu_image'>
              <img src='/img/basket_icon.png' alt='dark theme' />
            </div>
            <div className='header-menu_text'>Меню</div>
          </div>
          <div className='header-cart'>
            <img src='/img/basket_icon.png' alt='dark theme' />
          </div>
          <div className='header-burger'>=</div>
        </div>
      </div>
      <main>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
