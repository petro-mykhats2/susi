// import React, { useState, useEffect } from 'react'

// const GetDatasFromDatabase = () => {
//   const [movies, setMovies] = useState([])
//   const [error, setError] = useState(null)

//   const fetchData = async () => {
//     try {
//       const response = await fetch('/.netlify/functions/conectToSusiDatabase')

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`)
//       }

//       const data = await response.json()
//       console.log('Received data from server:', data)

//       setMovies(data)
//     } catch (error) {
//       console.error('Error fetching data:', error)
//       setError(error.message || 'An error occurred while fetching the data.')
//     }
//   }

//   useEffect(() => {
//     console.log('Fetching data...')
//     fetchData() // Викликати при завантаженні компонента
//   }, []) // Важливо передати пустий масив для useEffect, щоб запобігти зацикленню викликів

//   return (
//     <div>
//       <h1>MongoDB with Netlify Functions</h1>
//       {error ? (
//         <p>Error: {error}</p>
//       ) : (
//         <ul>
//           {movies.map((movie) => (
//             <li key={movie._id}>
//               {movie.name} {movie.phone} {movie.message}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   )
// }

// export default GetDatasFromDatabase
import React, { useState, useEffect } from 'react'
import InputOrderDetailsCard from './inputOrderDetailsCard'

function GetDatasFromDatabase({ loggedIn }) {
  console.log('loggedIn', loggedIn)
  const [orders, setOrders] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      // if (!loggedIn) return // Не виконувати запит, якщо не авторизовано

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

  return (
    <div>
      {orders.map((order) => (
        <div className='inputOrderDetailsCard container'>
          <InputOrderDetailsCard order={order} key={order._id} />
        </div>
      ))}
      {/* <table className='orders-table'>
        <tbody>
          {orders.map((order) => (
            <React.Fragment key={order._id?.$oid}>
              <tr className='order-header'>
                <th colSpan='2'>Замовлення: {order.name || 'Невідомо'}</th>
              </tr>
              <tr className='order-item'>
                <td>Повідомлення:</td>
                <td>{order.message || 'Не вказано'}</td>
              </tr>
              <tr className='order-item'>
                <td>Телефон:</td>
                <td>{order.phone || 'Не вказано'}</td>
              </tr>
              {order.deliveryFormData && (
                <React.Fragment>
                  <tr className='order-item'>
                    <td>Спосіб доставки:</td>
                    <td>
                      {order.deliveryFormData.deliveryOption || 'Не вказано'}
                    </td>
                  </tr>
                  <tr className='order-item'>
                    <td>Адреса:</td>
                    <td>
                      {order.deliveryFormData.pickupAddress || 'Не вказано'}
                    </td>
                  </tr>
                </React.Fragment>
              )}
              {order.timeFormData && (
                <React.Fragment>
                  <tr className='order-item'>
                    <td>Опція доставки:</td>
                    <td>
                      {order.timeFormData.deliveryTimeOption || 'Не вказано'}
                    </td>
                  </tr>
                  <tr className='order-item'>
                    <td>Наступна година:</td>
                    <td>
                      {order.timeFormData.nextHour
                        ? new Date(order.timeFormData.nextHour).toLocaleString()
                        : 'Не вказано'}
                    </td>
                  </tr>
                </React.Fragment>
              )}
              {order.accessoriesData && (
                <React.Fragment>
                  <tr className='order-item'>
                    <td>Кількість аксесуарів:</td>
                    <td>{order.accessoriesData.quantity || '0'}</td>
                  </tr>
                  <tr className='order-item'>
                    <td>Освітній:</td>
                    <td>{order.accessoriesData.educational ? 'Так' : 'Ні'}</td>
                  </tr>
                </React.Fragment>
              )}
              {order.cartData && order.cartData.length > 0 && (
                <tr className='order-details'>
                  <td colSpan='2'>
                    <strong>Кошик:</strong>
                    <ul>
                      {order.cartData.map((item) => (
                        <li key={item.id}>
                          {item.name || 'Невідомий продукт'} - Ціна:{' '}
                          {item.price || '0'} - Кількість:{' '}
                          {item.quantity || '0'}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table> */}
      {error && <p>{error}</p>}
    </div>
  )
}

export default GetDatasFromDatabase
