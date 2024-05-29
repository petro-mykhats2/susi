import React, { useState, useEffect } from 'react'

const InputOrderDetailsCard = ({ order, index }) => {
  const [localTime, setLocalTime] = useState('')
  const [nextOrderTime, setNextOrderTime] = useState('')

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date()
      const localHours = now.getUTCHours() + 2 // Додавання 2 годин для місцевого часу в Чехії
      const localMinutes = now.getUTCMinutes().toString().padStart(2, '0')
      const localSeconds = now.getUTCSeconds().toString().padStart(2, '0')
      setLocalTime(`${localHours}:${localMinutes}:${localSeconds}`)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    setNextOrderTime(new Date(order.timeFormData.nextHour).toLocaleString())
  }, [order])

  const remainingTime = () => {
    const nextHour = new Date(order.timeFormData.nextHour)
    const now = new Date()
    const timeDiff = nextHour - now

    let sign = ''
    if (timeDiff < 0) {
      sign = '-'
    }

    const hours = Math.abs(Math.floor(timeDiff / (1000 * 60 * 60)))
    const minutes = Math.abs(
      Math.floor((Math.abs(timeDiff) % (1000 * 60 * 60)) / (1000 * 60))
    )
    const seconds = Math.abs(
      Math.floor((Math.abs(timeDiff) % (1000 * 60)) / 1000)
    )

    const formattedHours = hours.toString().padStart(2, '0')
    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedSeconds = seconds.toString().padStart(2, '0')

    return `${sign}${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  }

  const getTextColor = () => {
    const timeString = remainingTime()
    const timeParts = timeString.split(':')
    const hours = parseInt(timeParts[0])

    if (hours < 0) {
      return 'red' // якщо час вже минув, колір червоний
    } else if (hours <= 0 && parseInt(timeParts[1]) <= 20) {
      return 'pink' // якщо менше 30 хвилин, колір рожевий
    } else {
      return 'white' // в інших випадках колір чорний
    }
  }

  // console.log(remainingTime())

  return (
    <div>
      <div className='card-container'>
        <div className='block1'>{index + 1}</div>
        <div className='block1-1'>
          {order.cartData && order.cartData.length > 0 && (
            <div className='order-details'>
              <div>
                <ul>
                  {order.cartData.map((item) => (
                    <div className='order-details-item' key={item.id}>
                      <div>{item.name || 'Невідомий продукт'}</div>
                      <div>{item.quantity || '0'}</div>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className='block2'>
          {' '}
          {order.deliveryFormData.deliveryOption === 'pickup' ? (
            <div className='delivery'>
              <p className='delivery-title__pickup'>Самовивіз</p>
              <p className='delivery-text__pickup'>
                {order.deliveryFormData.pickupAddress}
              </p>
            </div>
          ) : (
            <div className='delivery'>
              <p className='delivery-title'> Доставити на адресу </p>
              <p className='delivery-text'>
                {order.deliveryFormData.pickupAddress}
              </p>
            </div>
          )}
        </div>
        <div className='block3'>
          {order.timeFormData.deliveryTimeOption === 'nearest'
            ? `Якнайшвидше - ${order.timeFormData.nextHour}`
            : `На дату - ${order.timeFormData.selectedDate} На таку годину - ${order.timeFormData.selectedTime}`}
        </div>
        <div className='block4' style={{ background: getTextColor() }}>
          {remainingTime()}
        </div>
        <div className='block5'>
          <button className='prepare'>Йду готувати</button>
          <button className='done'>Приготовлено</button>
        </div>
      </div>
    </div>
  )
}

export default InputOrderDetailsCard
