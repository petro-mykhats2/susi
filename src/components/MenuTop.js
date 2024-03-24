import { Link } from 'gatsby'
import React from 'react'

function MenuTop({ data }) {
  const sortedMenuItems = data.edges.sort((a, b) => {
    return a.node.frontmatter.item_index - b.node.frontmatter.item_index
  })

  return (
    <div className='menuTop'>
      {sortedMenuItems.map(({ node }) => (
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
