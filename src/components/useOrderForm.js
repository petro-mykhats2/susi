import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { clearCart } from '../redux/cart'

const useOrderForm = (cartItems, totalPrice) => {
  const [isOrdering, setIsOrdering] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [nameError, setNameError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const [promoCodeDiscount, setPromoCodeDiscount] = useState(0)
  const [totalPriceWithDiscount, setTotalPriceWithDiscount] = useState(0)
  const dispatch = useDispatch()

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

  const priceWithDiscount = totalPrice - totalPriceWithDiscount

  const errorBlockRef = useRef(null)

  // Оновлення загальної суми з урахуванням знижки
  useEffect(() => {
    const discountAmount = (totalPrice * promoCodeDiscount) / 100
    setTotalPriceWithDiscount(totalPrice - discountAmount)
  }, [promoCodeDiscount, totalPrice])

  // Оновлення cartData при зміні товарів у кошику
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      cartData: cartItems,
    }))
  }, [cartItems])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))

    if (name === 'name') setNameError(!value)
    if (name === 'phone') setPhoneError(!value)
  }

  const handlePromoCodeResult = (discountValue) => {
    setPromoCodeDiscount(discountValue)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !formData.name ||
      !formData.phone ||
      !formData.deliveryFormData.pickupAddress
    ) {
      setNameError(!formData.name)
      setPhoneError(!formData.phone)
      setAddressError(!formData.deliveryFormData.pickupAddress)

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
          ...formData,
          totalPriceWithDiscount,
          promoCodeDiscount,
        }),
      }

      const response = await fetch(
        '/.netlify/functions/pushDataToDB',
        requestOptions
      )
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

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

      // Очищення форми та кошика після успішного замовлення
      setFormData({
        name: '',
        phone: '',
        message: '',
        deliveryFormData: {}, // Очищення даних доставки
        timeFormData: {}, // Очищення даних часу доставки
        cartData: [], // Очищення даних товарів
        accessoriesData: {
          quantity: 2,
          educational: false,
        },
      })
      setPromoCodeDiscount(0)
      dispatch(clearCart()) // Очищення знижки промокоду
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

  return {
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
  }
}

export default useOrderForm
