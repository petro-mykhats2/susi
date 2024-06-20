import { Link, useI18next } from 'gatsby-plugin-react-i18next'
import React from 'react'

const Sidebar = ({ siteTitle }) => {
  const { languages, originalPath } = useI18next()
  return (
    <header className='main-header'>
      <h1 style={{ margin: 0 }}>
        <Link
          to='/'
          style={{
            color: `black`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <ul className='languages'>
        {languages.map((lng) => (
          <li key={lng}>
            <Link to={originalPath} language={lng}>
              {lng}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  )
}
export default Sidebar
