import React, { useEffect, useState } from 'react'

const workStartTime = 11 // Початок робочого часу (11:00)
const workEndTime = 22 // Кінець робочого часу (22:00)
const defaultDeliveryTime = 60 // За замовчуванням 1 година в хвилинах
const deliveryTimeRounding = 10 // Заокруглення до +10 хвилин

function DeliveryTime({ handleTimeFormData }) {
  const [deliveryTimeOption, setDeliveryTimeOption] = useState('nearest')
  const [selectedTime, setSelectedTime] = useState('')
  const [minDeliveryTime, setMinDeliveryTime] = useState({
    hours: 11,
    minutes: 0,
  })

  useEffect(() => {
    // Set selected time
    const now = new Date()
    const nextHour = new Date(now.getTime() + defaultDeliveryTime * 60 * 1000) // Додаємо 1 годину
    const roundedMinutes =
      Math.ceil(nextHour.getMinutes() / deliveryTimeRounding) *
      deliveryTimeRounding // Заокруглюємо до +10 хвилин
    nextHour.setMinutes(roundedMinutes)
    setSelectedTime(nextHour)

    // Set minimum delivery time
    const currentHour = now.getHours()
    if (currentHour >= workStartTime && currentHour < workEndTime) {
      // Якщо поточний час між робочим часом, можна приймати замовлення до кінця робочого часу
      setMinDeliveryTime({ hours: currentHour + 1, minutes: 0 })
    } else {
      // В іншому випадку, можна приймати замовлення наступного дня
      setMinDeliveryTime({ hours: workStartTime, minutes: 0 })
    }
    handleTimeFormData({ deliveryTimeOption, nextHour })
  }, [])

  const handleTimeOptionChange = () => {
    const now = new Date()
    now.setHours(now.getHours() + 1)
    const roundedMinutes = Math.ceil(now.getMinutes() / 10) * 10
    now.setMinutes(roundedMinutes)
    setSelectedTime(now)
    handleTimeFormData({
      deliveryTimeOption,
      selectedTime: now,
    })
  }

  const validHours = {
    hours: {
      min: minDeliveryTime.hours,
      max: 22,
    },
    minutes: { step: 10 },
  }

  return (
    <div className='delivery-time'>
      <input
        type='radio'
        id='nearestDelivery'
        name='deliveryTimeOption'
        value='nearest'
        checked={deliveryTimeOption === 'nearest'}
        onChange={handleTimeOptionChange}
      />
      <label htmlFor='nearestDelivery'>На найближчий час</label>

      {selectedTime && (
        <div className='delivery-time-selected'>
          <p>Обраний час доставки: </p>
          <span className='selected-time'>
            {selectedTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      )}
    </div>
  )
}

export default DeliveryTime
