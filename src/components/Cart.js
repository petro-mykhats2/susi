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
      {cartItems && cartItems.length === 0 ? (
        <div>Корзина пуста</div>
      ) : (
        <div className='cart-container'>
          <div onSubmit={handleSubmit}>
            {cartItems &&
              cartItems.map((item) => (
                <div key={item.id} className='cart-item'>
                  <div>
                    <span
                      className='cart-button'
                      onClick={() => handleRemoveFromCart(item)}
                    ></span>
                  </div>
                  <div className='card-item__img'>
                    <img
                      className='Cart__imgSmall'
                      src={item.img}
                      alt={item.name}
                    />
                  </div>
                  <br />
                  <div className='cart-name'>{item.name}</div>
                  <div className='cart-item__buttom'>
                    <div className='cart-totalPrice'>
                      {(item.price * item.quantity).toFixed(2)} грн
                    </div>
                    <div className='cart-buttons'>
                      <button
                        type='button'
                        className='cart-button-quantity'
                        onClick={() =>
                          handleChangeQuantity(item, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        type='button'
                        className='cart-button-quantity'
                        onClick={() =>
                          handleChangeQuantity(item, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            <span className='total-price'>
              <div className='total-price-title'>Загальна вартість:</div>
              <div>{cartTotal.toFixed(2)} грн</div>
            </span>
          </div>
          <hr />
        </div>
      )}
    </div>
  )
}

export default Cart
