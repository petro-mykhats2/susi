import { Link } from 'gatsby'
import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cart'

// перевірити чи з цього компонента додається в корзину

const ItemProductCategory = ({ orderdata }) => {
  const [showAddedToCartMessage, setShowAddedToCartMessage] = useState(false)

  const dispatch = useDispatch()
  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    setShowAddedToCartMessage(true)

    setTimeout(() => {
      setShowAddedToCartMessage(false)
    }, 3000)
  }
  return (
    <div className='menuCategory-item'>
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
          {/* Додано до корзини повідомлення */}
          {showAddedToCartMessage && (
            <div className='added-to-cart-message' style={{ top: '50px' }}>
              Додано до корзини
            </div>
          )}
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
          onClick={() => handleAddToCart(orderdata)}
          className='item-buttom_button'
        >
          В кошик
        </div>
      </div>
    </div>
  )
}
export default ItemProductCategory
