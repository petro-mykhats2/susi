import React, { useEffect, useState } from 'react'
import Cart from './Cart'
import fetch from 'cross-fetch'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../redux/cart'
import DeliveryForm from './DeliveryForm'
import DeliveryTime from './DeliveryTime'
import Accessories from './Accessories'

const CartSlider = ({ isOpen, onClose }) => {
  const [isOrdering, setIsOrdering] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [addressError, setAddressError] = useState(false)

  const handleDeliveryFormData = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      deliveryFormData: data,
    }))
  }

  const handleTimeFormData = (data) => {
    console.log('data time!!!!', data)
    setFormData((prevData) => ({
      ...prevData,
      timeFormData: data,
    }))
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    deliveryFormData: {},
    timeFormData: {},
    cartData: [],
  })

  const dispatch = useDispatch()
  // Отримання даних з Redux state
  const cartItems = useSelector((state) => state.cart.cartItems)

  // Оновлення cartData при зміні cartItems у Redux state
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      cartData: cartItems,
    }))
  }, [cartItems])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Перевірка коректності заповнення полів
    if (
      !formData.name ||
      !formData.email ||
      !formData.deliveryFormData.pickupAddress
    ) {
      setNameError(!formData.name)
      setEmailError(!formData.email)
      setAddressError(true)
      return
    }

    setIsOrdering(true)

    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          age: formData.message,
          email: formData.email,
          deliveryFormData: formData.deliveryFormData,
          timeFormData: formData.timeFormData,
          cartData: formData.cartData,
        }),
      }

      const response = await fetch(
        '/.netlify/functions/pushDataToDB',
        requestOptions
      )
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      // Оновлення станів при успішному виконанні
      setSuccessMessage('Ваше замовлення успішно виконано!')
      setErrorMessage('')

      // Очищення форми
      setFormData({
        name: '',
        email: '',
        message: '',
        deliveryFormData: {},
        timeFormData: {},
        cartData: [],
      })
      dispatch(clearCart())
    } catch (error) {
      console.error('Error sending the message:', error)
      // У випадку помилки також прибрати повідомлення через 2 секунди
      setTimeout(() => {
        setErrorMessage('')
      }, 2000)
    } finally {
      // Через 2 секунди прибрати повідомлення про успіх
      setTimeout(() => {
        setSuccessMessage('')
      }, 4000)
    }
    // Змінити стан для приховання форми після відправки
    setIsOrdering(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === 'name') setNameError(!value)
    if (name === 'email') setEmailError(!value)
  }

  return (
    <div className={`cart-slider ${isOpen ? 'open' : ''}`}>
      <div className='cart-header'>
        <h2>Корзина</h2>
        <button onClick={onClose}>Закрити</button>
      </div>
      <Cart />
      {cartItems && cartItems.length === 0 ? null : (
        <form onSubmit={handleSubmit} className='form-checkoutBlock'>
          <h3 className='form-field'>Оформити замовлення</h3>
          <div className={`form-field ${nameError ? 'error' : ''}`}>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              placeholder='Ваше імя'
            />
          </div>
          {nameError ? (
            <p className='errorMessage'>заповніить правильно імя!</p>
          ) : null}
          <div className={`form-field ${emailError ? 'error' : ''}`}>
            <input
              type='phone'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              placeholder='Ваш номер телефону'
              // pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}'
            />
          </div>
          {emailError ? (
            <p className='errorMessage'>заповніить правильно номер телефону!</p>
          ) : null}
          <DeliveryForm
            handleDeliveryFormData={handleDeliveryFormData}
            addressError={addressError}
          />
          <DeliveryTime handleTimeFormData={handleTimeFormData} />
          <Accessories />

          <div className='form-field'>
            <textarea
              type='text'
              id='message'
              name='message'
              value={formData.message}
              onChange={handleInputChange}
              placeholder='Напишіть ваші побажання або зауваження (необовязково)'
            />
          </div>
          {/* {ErrorFormDatasMessage && (
            <p style={{ color: 'red' }}>{ErrorFormDatasMessage}</p>
          )} */}
          <button
            className='item-buttom_button  button_submit'
            type='submit'
            disabled={isOrdering}
          >
            Замовити
          </button>
        </form>
      )}
      {/* Повідомлення про успіх або помилку */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  )
}

export default CartSlider
