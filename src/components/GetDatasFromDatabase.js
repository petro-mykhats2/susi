import React, { useEffect, useState } from 'react'
// import InputOrderDetailsCard from './inputOrderDetailsCard'
import orderss from '../data_orders.json'
import TestInputOrderDetailsCart from './TestInputOrderDetailsCart'

function GetDatasFromDatabase({ loggedIn }) {
  console.log('orderss', orderss)
  const [orders, setOrders] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/.netlify/functions/loadOrders')

        if (!response.ok) {
          throw new Error('Failed to fetch orders')
        }

        const data = await response.json()
        setOrders(data)
      } catch (error) {
        setError(error.message)
      }
    }

    fetchData()
  }, [loggedIn])

  // Сортуємо замовлення по часу на найближчий
  const sortedOrders = [...orders].sort((a, b) => {
    // Перевірка наявності часу у кожному замовленні
    const timeA = new Date(a.timeFormData?.nextHour)
    const timeB = new Date(b.timeFormData?.nextHour)

    // Перевірка, щоб уникнути порожніх значень
    if (isNaN(timeA) || isNaN(timeB)) {
      return 0 // Якщо час некоректний, не змінюємо порядок
    }

    return timeA - timeB // Сортуємо від найменшого до найбільшого
  })

  return (
    <div>
      {sortedOrders.map((order, index) => (
        <div className='inputOrderDetailsCard container' key={index}>
          {/* <InputOrderDetailsCard order={order} key={order._id} index={index} /> */}
          <TestInputOrderDetailsCart
            order={order}
            // key={order._id}
            key={index}
            index={index}
          />
        </div>
      ))}
      {error && <p>{error}</p>}
    </div>
  )
}

export default GetDatasFromDatabase
