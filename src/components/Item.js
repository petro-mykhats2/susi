import React from 'react'

const Item = ({ orderdata }) => {
  return (
    <div>
      <span>{orderdata.frontmatter.title + '   '}</span>
      <span>{orderdata.frontmatter.parameters + '   '}</span>
      <span>{orderdata.frontmatter.price}</span>
      <img
        className='item_img'
        src={orderdata.frontmatter.image}
        alt='imagee'
      />
    </div>
  )
}
export default Item
