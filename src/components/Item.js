import { Link } from 'gatsby'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/cart'
import { addToFavorite, removeFromFavorite } from '../redux/favorite'

const Item = ({ orderdata }) => {
  const dispatch = useDispatch()
  const [showAddedToCartMessage, setShowAddedToCartMessage] = useState(false)
  const favoriteItems = useSelector((state) => state.favorite.favoriteItems)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showAddedToFavoriteMessage, setShowAddedToFavoriteMessage] = useState(
    false
  )
  const [
    showRemoveFromFavoriteMessage,
    setShowRemoveFromFavoriteMessage,
  ] = useState(false)

  // Встановлюємо значення isFavorite при завантаженні компоненту або зміні favoriteItems
  useEffect(() => {
    if (favoriteItems) {
      const favorite = favoriteItems.some(
        (item) =>
          item.frontmatter &&
          item.frontmatter.title === orderdata.frontmatter.title
      )
      setIsFavorite(favorite)
    }
  }, [favoriteItems, orderdata.frontmatter.title])

  // Функція для додавання або видалення з улюблених
  const handleFavorites = () => {
    console.log('Current isFavorite state:', isFavorite)
    console.log('Current orderdata:', orderdata)

    if (isFavorite) {
      console.log('Removing from favorites:', orderdata)
      dispatch(removeFromFavorite(orderdata)) // Видаляємо з обраних
      setShowRemoveFromFavoriteMessage(true)
      setTimeout(() => {
        setShowRemoveFromFavoriteMessage(false)
      }, 3000)
    } else {
      dispatch(addToFavorite(orderdata))
      setShowAddedToFavoriteMessage(true)
    }
    setIsFavorite(!isFavorite) // Змінюємо стан улюблених
    setTimeout(() => {
      setShowAddedToFavoriteMessage(false)
    }, 3000)
  }

  // Функція для додавання в кошик
  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    setShowAddedToCartMessage(true)

    setTimeout(() => {
      setShowAddedToCartMessage(false)
    }, 3000)
  }

  return (
    <div className='item'>
      {orderdata.frontmatter.weight && (
        <div className='item-top'>
          <div className='order-top_weight'>
            {orderdata.frontmatter.weight} г
          </div>
        </div>
      )}
      <div className='product-favorite' onClick={handleFavorites}>
        <img
          src={isFavorite ? '/img/favorite_red.svg' : '/img/favorite.svg'}
          alt='imagee'
        />
      </div>
      <Link to={`/menu/product/${orderdata.fields.slug}`}>
        {orderdata.frontmatter.top ? (
          <div className='stiker-product-block-mini'>
            <img src='/img/top.png' alt='imagee' />
          </div>
        ) : null}
        <div className='item-img'>
          <img src={orderdata.frontmatter.image} alt='imagee' />{' '}
        </div>
        <div className='item-title'>{orderdata.frontmatter.title}</div>
        {/* Додано до корзини повідомлення */}
        {showAddedToCartMessage && (
          <div className='added-to-cart-message'>Додано до корзини</div>
        )}
        {showAddedToFavoriteMessage && (
          <div className='added-to-cart-message'>
            Додано до улюблених товарів
          </div>
        )}
        {showRemoveFromFavoriteMessage && (
          <div className='added-to-cart-message'>Видалено</div>
        )}
        <div className='item-text'>
          {orderdata.frontmatter.description &&
          orderdata.frontmatter.description.length > 145
            ? `${orderdata.frontmatter.description.slice(0, 145)}...`
            : orderdata.frontmatter.description}
        </div>
        {orderdata.frontmatter.product_composition && (
          <div className='item-text'>
            Склад:{' '}
            {orderdata.frontmatter.product_composition
              ? orderdata.frontmatter.product_composition.join(', ')
              : ''}
          </div>
        )}
        {orderdata.frontmatter.weight && (
          <div className='item-text-bold'>
            <span className='item-text-bold'>Вага: </span>{' '}
            {orderdata.frontmatter.weight} г
          </div>
        )}
      </Link>
      <div className='item-buttom'>
        <div className='item-buttom_price'>
          {orderdata.frontmatter.price.toFixed(2)} грн
        </div>
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
