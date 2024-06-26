import React, { useState } from 'react'
import Layout from '../layout'
import { Link } from 'gatsby'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/cart'
import { addToFavorite, removeFromFavorite } from '../redux/favorite'

function Product({ pageContext }) {
  const ingredients = pageContext.ingredients
  const productComposition = pageContext.product_composition
  const [counter, setCounter] = useState(1)

  // Функція для перевірки наявності інгредієнта
  const isIngredientAvailable = (ingredientName) => {
    return ingredients.some(
      (ingredient) =>
        ingredient.node.frontmatter.title.toLowerCase().replace(/\s/g, '-') ===
        ingredientName.toLowerCase()
    )
  }

  // Функція для отримання зображення інгредієнта
  const getIngredientImage = (ingredientName) => {
    const formattedIngredientName = ingredientName
      .toLowerCase()
      .replace(/\s/g, '-') // Замінюємо всі пробіли на дефіси для форматування

    const ingredient = ingredients.find(
      (ingredient) =>
        ingredient.node.frontmatter.title.toLowerCase().replace(/\s/g, '-') ===
        formattedIngredientName
    )

    return ingredient ? ingredient.node.frontmatter.image : null
  }

  const categories = pageContext.categories
  const dispatch = useDispatch()
  const [showAddedToCartMessage, setShowAddedToCartMessage] = useState(false)
  const [showAddedToFavoriteMessage, setShowAddedToFavoriteMessage] = useState(
    false
  )
  const [
    showRemoveFromFavoriteMessage,
    setShowRemoveFromFavoriteMessage,
  ] = useState(false)

  const favoriteItems = useSelector((state) => state.favorite.favoriteItems)

  const isFavorite = favoriteItems.some(
    (item) => item.frontmatter && item.frontmatter.title === pageContext.title
  )

  const handleAddToCart = (product) => {
    dispatch(addToCart(product, counter))
    setShowAddedToCartMessage(true)

    setTimeout(() => {
      setShowAddedToCartMessage(false)
    }, 3000)
  }

  const handleFavorites = (product) => {
    if (isFavorite) {
      dispatch(removeFromFavorite(product))
      setShowRemoveFromFavoriteMessage(true)
      setTimeout(() => {
        setShowRemoveFromFavoriteMessage(false)
      }, 3000)
    } else {
      dispatch(addToFavorite(product))
      setShowAddedToFavoriteMessage(true)
    }

    setTimeout(() => {
      setShowAddedToFavoriteMessage(false)
    }, 3000)
  }

  const incrementCounter = () => {
    setCounter(counter + 1)
  }

  const decrementCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1)
    }
  }

  const currentCategory =
    categories &&
    categories.find(
      (category) =>
        category.node.fields.slug ===
        (pageContext && pageContext.categoryProduct)
    )

  return (
    <Layout>
      <div className='breadcrumb'>
        <Link to='/'>
          <img src='/img/mainPage.png' alt='main Page' />
          Головна
        </Link>
        <span>{'>'}</span>
        <Link to={`/menu/`}>Меню</Link>
        <span>{'>'}</span>
        {/* Виводимо назву знайденої категорії, якщо така є */}
        {currentCategory && (
          <Link to={`/menu/${currentCategory.node.fields.slug}`}>
            {currentCategory.node.frontmatter.name}
          </Link>
        )}
        <span>{'>'}</span>
        <span>{pageContext.title}</span>
      </div>
      <div className='product'>
        <div className='product-top'>
          <div className='product-img'>
            <div
              className='product-favorite'
              onClick={() => handleFavorites(pageContext.forCart)}
            >
              <img
                src={isFavorite ? '/img/favorite_red.svg' : '/img/favorite.svg'}
                alt='imagee'
              />
            </div>
            <img src={pageContext.image} />
            {showAddedToFavoriteMessage && (
              <div className='added-to-cart-message'>
                Додано до улюблених товарів
              </div>
            )}
            {showRemoveFromFavoriteMessage && (
              <div className='added-to-cart-message'>
                Видалено улюблених товарів
              </div>
            )}{' '}
          </div>

          <div className='product-right'>
            <div className='product-name'>{pageContext.title}</div>
            {/* Додано до корзини повідомлення */}
            {showAddedToCartMessage && (
              <div className='added-to-cart-message'>Додано до корзини</div>
            )}

            <div className='product-label'>Кількість:</div>
            <div className='product-label_under'>8 шт</div>
            {pageContext.weight && (
              <>
                <div className='product-label'>Вага: </div>
                <div className='product-label_under'>
                  {pageContext.weight} г
                </div>
              </>
            )}
            <div className='slider-container'>
              {productComposition && (
                <div className='product-label_under product-slider'>
                  {productComposition.map((ingredientName, index) => (
                    <div key={index} className='product-slider-item'>
                      {/* Перевірка наявності інгредієнта */}
                      {isIngredientAvailable(ingredientName) ? (
                        <div className='product-slider-item-img'>
                          <img
                            src={getIngredientImage(ingredientName)}
                            alt='imagee'
                          />
                        </div>
                      ) : null}
                      <div className='product-slider-item-title'>
                        {ingredientName.replace(/-/g, ' ')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className='product-right_bottom'>
            <div className='product-right_bottom_left'>
              <div className='product-price'>
                {pageContext.price.toFixed(2) * counter} грн
              </div>
              <div className='product-calc'>
                <div className='product-calc_less' onClick={decrementCounter}>
                  <img src='/img/minus.svg' alt='minus' />
                </div>
                <div className='product-calc_counter'>{counter}</div>
                <div className='product-calc_less' onClick={incrementCounter}>
                  <img src='/img/plus.svg' alt='minus' />
                </div>
              </div>
            </div>
            <div className='product-right_bottom_right'>
              <div
                className='product_button'
                onClick={() => {
                  handleAddToCart(pageContext.forCart, counter)
                }}
              >
                <div className='product_button_img'>
                  <img src='/img/shopping-cart.png' alt='imagee' />
                </div>
                <div className='product_button_text'>В КОШИК</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='product-info'>{pageContext.description}</div>
    </Layout>
  )
}

export default Product
