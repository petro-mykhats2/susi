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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
          accessoriesData: formData.accessoriesData,
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

      setSuccessMessage('Ваше замовлення успішно виконано!')
      setErrorMessage('')

      setFormData({
        name: '',
        email: '',
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
      setTimeout(() => {
        setErrorMessage('')
      }, 2000)
    } finally {
      setTimeout(() => {
        setSuccessMessage('')
      }, 4000)
    }
    setIsOrdering(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === 'name') setNameError(!value)
    if (name === 'email') setEmailError(!value)
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
          <Accessories onChange={handleAccessoriesChange} />
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
          <button
            className='item-buttom_button  button_submit'
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
