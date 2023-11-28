import { Link } from 'gatsby'
import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cart'

const Item = ({ orderdata }) => {
  // console.log('orderdata in item...', orderdata)
  const dispatch = useDispatch()
  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }
  return (
    <div className='item'>
      <Link to={`/menu/product/${orderdata.fields.slug}`}>
        <div>
          {' '}
          <div className='item-top'>
            <div className='order-top_weight'>
              {orderdata.frontmatter.weight}
            </div>
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
      </Link>
      <div className='item-buttom'>
        <div className='item-buttom_price'>{orderdata.frontmatter.price}</div>

        <div
          className='item-buttom_button'
          onClick={() => handleAddToCart(orderdata)}
        >
          В кошик
        </div>
      </div>
    </div>
  )
}
export default Item
