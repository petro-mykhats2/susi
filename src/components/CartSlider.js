import React from 'react'
import Cart from './Cart'
import { useSelector } from 'react-redux'
import DeliveryForm from './DeliveryForm'
import DeliveryTime from './DeliveryTime'
import Accessories from './Accessories'
import PromoCodeChecker from './PromoCodeChecker'
import CartHeader from './CartHeader'
import Notification from './Notification'
import LoaderOverlay from './LoaderOverlay'
import useOrderForm from './useOrderForm'

const CartSlider = ({ isOpen, onClose }) => {
  const cartItems = useSelector((state) => state.cart.cartItems)
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const {
    formData,
    handleInputChange,
    handlePromoCodeResult,
    handleSubmit,
    setFormData,
    isOrdering,
    successMessage,
    errorMessage,
    nameError,
    phoneError,
    addressError,
    errorBlockRef,
    totalPriceWithDiscount,
    promoCodeDiscount,
    priceWithDiscount,
  } = useOrderForm(cartItems, totalPrice)

  return (
    <div className={`cart-slider ${isOpen ? 'open' : ''}`}>
      <CartHeader onClose={onClose} />
      <Cart />
      {cartItems && cartItems.length === 0 ? null : (
        <form onSubmit={handleSubmit} className='form-checkoutBlock'>
          <div
            ref={errorBlockRef}
            tabIndex={-1}
            aria-hidden='true'
            className={`form-field ${nameError ? 'error' : ''}`}
          >
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              placeholder='Ваше імʼя'
            />
          </div>
          {nameError && (
            <p className='errorMessage'>Заповніть правильно імʼя!</p>
          )}
          <div className={`form-field ${phoneError ? 'error' : ''}`}>
            <input
              type='phone'
              id='phone'
              name='phone'
              value={formData.phone}
              onChange={handleInputChange}
              placeholder='Ваш номер телефону'
            />
          </div>
          {phoneError && (
            <p className='errorMessage'>Заповніть правильно номер телефону!</p>
          )}
          <DeliveryForm
            handleDeliveryFormData={(data) =>
              setFormData((prevData) => ({
                ...prevData,
                deliveryFormData: data,
              }))
            }
          />
          <DeliveryTime
            handleTimeFormData={(data) =>
              setFormData((prevData) => ({ ...prevData, timeFormData: data }))
            }
          />
          <Accessories
            onChange={(accessoriesData) =>
              setFormData((prevData) => ({ ...prevData, accessoriesData }))
            }
          />
          {isOrdering && <LoaderOverlay />}
          <div className='form-field'>
            <textarea
              type='text'
              id='message'
              name='message'
              value={formData.message}
              onChange={handleInputChange}
              placeholder='Напишіть ваші побажання або зауваження (необов’язково)'
            />
          </div>
          <PromoCodeChecker onApplyPromoCode={handlePromoCodeResult} />
          {promoCodeDiscount > 0 ? (
            <div className='total-price'>
              <div className='total-price-title-small'>Загальна вартість:</div>
              <div className='old-price'> {totalPrice.toFixed(2)} грн</div>
              <div className='discount'>
                <div className='discount-title'>Знижка:</div>
                <div>
                  {' '}
                  -{promoCodeDiscount.toFixed(2)} % {'( '}
                  {priceWithDiscount.toFixed(2)}
                  {' грн)'}
                </div>
              </div>
            </div>
          ) : null}{' '}
          <div className='total-price price-final'>
            <div className='total-price-title'>
              {promoCodeDiscount > 0
                ? 'Загальна вартість зі знижкою:'
                : 'Загальна вартість:'}
            </div>

            <div> {totalPriceWithDiscount.toFixed(2)} грн</div>
          </div>
          <button
            className={`item-buttom_button button_submit ${
              isOrdering ? 'loading' : ''
            }`}
            type='submit'
            disabled={isOrdering}
          >
            Замовити
          </button>
        </form>
      )}
      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    </div>
  )
}

export default CartSlider
