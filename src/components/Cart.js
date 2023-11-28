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

  return (
    <div>
      <h2>Корзина</h2>
      {cartItems && cartItems.length === 0 ? (
        <div>Корзина пуста</div>
      ) : (
        <div>
          <form>
            {cartItems &&
              cartItems.map((item) => (
                <li key={item.id}>
                  <img className='imgSmallCart' src={item.img} />
                  {item.name}
                  <button
                    onClick={() =>
                      handleChangeQuantity(item, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    onClick={() =>
                      handleChangeQuantity(item, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                  ${item.price}${item.price * item.quantity}
                  <div>
                    <button onClick={() => handleRemoveFromCart(item)}>
                      Видалити
                    </button>
                  </div>
                </li>
              ))}
            <li>
              <div>Загальна вартість:</div>
              <div>${cartTotal.toFixed(2)}</div>
            </li>
          </form>
          <hr />
        </div>
      )}
    </div>
  )
}

export default Cart
