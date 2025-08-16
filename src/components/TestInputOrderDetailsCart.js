import React, { useState, useEffect } from 'react'

const InputOrderDetailsCard = ({ order, index }) => {
  const [localTime, setLocalTime] = useState('')
  const [nextOrderTime, setNextOrderTime] = useState('')

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date()
      const localHours = now.getUTCHours() + 1 // Додавання 2 годин для місцевого часу в Чехії
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
    let targetTime =
      order.timeFormData.deliveryTimeOption === 'nearest'
        ? new Date(order.timeFormData.nextHour)
        : new Date(order.timeFormData.selectedTime)

    const now = new Date()
    const timeDiff = targetTime - now

    const sign = timeDiff < 0 ? '-' : '' // Додаємо знак "мінус", якщо час уже минув

    const hours = Math.floor(Math.abs(timeDiff) / (1000 * 60 * 60))
    const minutes = Math.floor(
      (Math.abs(timeDiff) % (1000 * 60 * 60)) / (1000 * 60)
    )
    const seconds = Math.floor((Math.abs(timeDiff) % (1000 * 60)) / 1000)

    return `${sign}${hours
      .toString()
      .padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const getTextColor = () => {
    const timeString = remainingTime()
    const timeParts = timeString.split(':')

    const isNegative = timeString.startsWith('-') // Перевіряємо, чи є знак "-"
    const hours = parseInt(timeParts[0]) // Години (може бути 00 або -00)
    const minutes = parseInt(timeParts[1]) // Хвилини

    if (isNegative) {
      return 'red' // якщо час уже минув, колір червоний
    } else if (hours === 0 && minutes <= 30) {
      return 'pink' // якщо менше 30 хвилин, колір рожевий
    } else {
      return 'white' // в інших випадках колір білий
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
                    <div className='order-details-item p2' key={item.id}>
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
          {order.timeFormData.deliveryTimeOption === 'nearest' ? (
            <div>
              <p>Якнайшвидше:</p>
              <p>{new Date(order.timeFormData.nextHour).toLocaleString()}</p>
            </div>
          ) : (
            <div>
              <p>На дату: {order.timeFormData.selectedDate}</p>
              <p>
                На таку годину:{' '}
                {new Date(order.timeFormData.selectedTime).toLocaleTimeString()}
              </p>
            </div>
          )}
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
