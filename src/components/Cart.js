import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, changeQuantity } from '../redux/cart'

const Cart = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cartItems)

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product))
  }

  const handleChangeQuantity = (product, newQuantity) => {
    dispatch(changeQuantity(product, newQuantity))
  }

  // Перевірка наявності cartItems перед викликом .reduce()
  const cartTotal = cartItems
    ? cartItems.reduce(
        (total, currentItem) =>
          total + currentItem.price * currentItem.quantity,
        0
      )
    : 0

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <h2>Корзина</h2>
      {cartItems && cartItems.length === 0 ? (
        <div>Корзина пуста</div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            {cartItems &&
              cartItems.map((item) => (
                <li key={item.id}>
                  <img
                    className='Cart__imgSmall'
                    src={item.img}
                    alt={item.name}
                  />
                  {item.name}
                  <button
                    type='button'
                    onClick={() =>
                      handleChangeQuantity(item, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    type='button'
                    onClick={() =>
                      handleChangeQuantity(item, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                  х {item.price.toFixed(2)}грн ={' '}
                  {(item.price * item.quantity).toFixed(2)} грн
                  <div>
                    <button
                      type='button'
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      Видалити
                    </button>
                  </div>
                </li>
              ))}
            <li>
              <div>Загальна вартість:</div>
              <div>{cartTotal.toFixed(2)} грн</div>
            </li>
          </form>
          <hr />
        </div>
      )}
    </div>
  )
}

export default Cart
