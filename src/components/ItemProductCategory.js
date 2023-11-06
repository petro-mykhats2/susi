import { Link } from 'gatsby'
import React from 'react'

const ItemProductCategory = ({ orderdata }) => {
  return (
    <Link
      to={`/menu/product/${orderdata.fields.slug}`}
      className='menuCategory-item'
    >
      <div>
        {' '}
        <div className='item-top'>
          <div className='order-top_weight'>{orderdata.frontmatter.weight}</div>
        </div>
        {orderdata.frontmatter.top ? (
          <div className='stiker-product-block-mini'>
            <img src='/img/top.png' alt='imagee' />
          </div>
        ) : null}
        <div className='item-img'>
          <img src={orderdata.frontmatter.image} alt='imagee' />{' '}
        </div>
        <div className='item-title'>{orderdata.frontmatter.title}</div>
        <div className='item-text'>{orderdata.frontmatter.description}</div>
        <div className='item-text'>
          {orderdata.frontmatter.product_composition}
        </div>
        <div className='item-text'>Вага: {orderdata.frontmatter.weight}</div>
      </div>
      <div className='item-buttom'>
        <div className='item-buttom_price'>{orderdata.frontmatter.price}</div>

        <div className='item-buttom_button'>В кошик</div>
      </div>
    </Link>
  )
}
export default ItemProductCategory
