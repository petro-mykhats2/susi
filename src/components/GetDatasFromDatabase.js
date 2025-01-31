import React, { useState, useEffect } from 'react'
import InputOrderDetailsCard from './inputOrderDetailsCard'
import orderss from '../data_orders.json'
import TestInputOrderDetailsCart from './TestInputOrderDetailsCart'

function GetDatasFromDatabase({ loggedIn }) {
  console.log('orderss', orderss)
  const [orders, setOrders] = useState([])
  const [error, setError] = useState(null)

  // useEffect(() => {
  //   // console.log('orders', orders)
  //   const fetchData = async () => {
  //     // if (!loggedIn) return // Не виконувати запит, якщо не авторизовано

  //     try {
  //       const response = await fetch('/.netlify/functions/loadOrders')

  //       if (!response.ok) {
  //         throw new Error('Failed to fetch orders')
  //       }

  //       const data = await response.json()
  //       setOrders(data)
  //     } catch (error) {
  //       setError(error.message)
  //     }
  //   }

  //   fetchData()
  // }, [loggedIn])

  const sortedOrders = orderss.sort((a, b) => {
    const timeDiffA = new Date(a.timeFormData.nextHour) - new Date()
    const timeDiffB = new Date(b.timeFormData.nextHour) - new Date()
    return timeDiffA - timeDiffB
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
