import { Link } from 'gatsby'
import React from 'react'

function MenuTop({ data }) {
  console.log('datawwwww', data)

  const menuItems = data.edges

  return (
    <div className='menuTop'>
      {menuItems.map(({ node }) => (
        <Link
          to={`/menu/${node.frontmatter.title}`}
          className='menuTop-item'
          key={node.frontmatter.name}
        >
          <img
            className='menuTop-image'
            src={node.frontmatter.image}
            alt={node.frontmatter.name}
          />
          <h2 className='menuTop-title'>{node.frontmatter.name}</h2>
        </Link>
      ))}
    </div>
  )
}

export default MenuTop
