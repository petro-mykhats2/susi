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
          {orderdata.frontmatter.weight && (
            <div className='item-top'>
              <div className='order-top_weight'>
                {orderdata.frontmatter.weight} г
              </div>
            </div>
          )}
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
            <div className='added-to-cart-message' style={{ top: '250px' }}>
              Додано до корзини
            </div>
          )}
          <div className='item-title'>{orderdata.frontmatter.title}</div>
          <div className='item-text'>
            {orderdata.frontmatter.description &&
            orderdata.frontmatter.description.length > 145
              ? `${orderdata.frontmatter.description.slice(0, 145)}...`
              : orderdata.frontmatter.description}
          </div>
          {orderdata.frontmatter.product_composition && (
            <div className='item-text'>
              {' '}
              Склад:{' '}
              {orderdata.frontmatter.product_composition
                ? orderdata.frontmatter.product_composition.join(', ')
                : ''}
            </div>
          )}
          {orderdata.frontmatter.weight && (
            <div className='item-text'>
              <span className='item-text-bold'>Вага: </span>
              {orderdata.frontmatter.weight} г
            </div>
          )}
        </div>
      </Link>
      <div className='item-buttom'>
        <div className='item-buttom_price'>
          {orderdata.frontmatter.price.toFixed(2)} грн
        </div>

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
