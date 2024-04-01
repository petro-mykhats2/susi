import React, { useEffect, useRef, useState } from 'react'
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
  const [phoneError, setPhoneError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const errorBlockRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    deliveryFormData: {},
    timeFormData: {},
    cartData: [],
    accessoriesData: {
      quantity: 2,
      educational: false,
    },
  })

  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cartItems)

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      cartData: cartItems,
    }))
  }, [cartItems])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !formData.name ||
      !formData.phone ||
      !formData.deliveryFormData.pickupAddress
    ) {
      setNameError(!formData.name)
      setPhoneError(!formData.phone)
      setAddressError(true)

      if (errorBlockRef.current) {
        errorBlockRef.current.focus()
      }
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
          message: formData.message,
          phone: formData.phone,
          deliveryFormData: formData.deliveryFormData,
          timeFormData: formData.timeFormData,
          accessoriesData: formData.accessoriesData,
          cartData: formData.cartData,
        }),
      }

      // Send data to MongoDB
      const response = await fetch(
        '/.netlify/functions/pushDataToDB',
        requestOptions
      )
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      // Send data to Telegram
      const telegramResponse = await fetch(
        '/.netlify/functions/telegram',
        requestOptions
      )
      if (!telegramResponse.ok) {
        throw new Error(
          `Error sending message to Telegram bot! Status: ${telegramResponse.status}`
        )
      }

      setSuccessMessage('Ваше замовлення успішно виконано!')
      setErrorMessage('')

      setFormData({
        name: '',
        phone: '',
        message: '',
        deliveryFormData: {},
        timeFormData: {},
        cartData: [],
        accessoriesData: {
          quantity: 2,
          educational: false,
        },
      })
      dispatch(clearCart())
    } catch (error) {
      console.error('Error sending the message:', error)
      setErrorMessage('Помилка при відправленні замовлення')
    } finally {
      setTimeout(() => {
        setSuccessMessage('')
        setErrorMessage('')
        setIsOrdering(false)
      }, 4000)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === 'name') setNameError(!value)
    if (name === 'phone') setPhoneError(!value)
  }

  const handleDeliveryFormData = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      deliveryFormData: data,
    }))
  }

  const handleTimeFormData = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      timeFormData: data,
    }))
  }

  const handleAccessoriesChange = (accessoriesData) => {
    setFormData((prevData) => ({
      ...prevData,
      accessoriesData: accessoriesData,
    }))
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
              placeholder='Ваше імя'
            />
          </div>
          {nameError && (
            <p className='errorMessage'>Заповніть правильно ім'я!</p>
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
          <DeliveryForm handleDeliveryFormData={handleDeliveryFormData} />
          <DeliveryTime handleTimeFormData={handleTimeFormData} />
          <Accessories onChange={handleAccessoriesChange} />
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
          <button
            className='item-buttom_button button_submit'
            type='submit'
            disabled={isOrdering}
          >
            Замовити
          </button>
        </form>
      )}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  )
}

export default CartSlider
