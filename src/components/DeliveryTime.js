import React, { useEffect, useState } from 'react'
import Datetime from 'react-datetime'

const workStartTime = 11 // Початок робочого часу (11:00)
const workEndTime = 22 // Кінець робочого часу (22:00)
const defaultDeliveryTime = 60 // За замовчуванням 1 година в хвилинах
const deliveryTimeRounding = 10 // Заокруглення до +10 хвилин

function DeliveryTime({ handleTimeFormData }) {
  const [deliveryTimeOption, setDeliveryTimeOption] = useState('nearest')
  const [selectedTime, setSelectedTime] = useState('')
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [daysList, setDaysList] = useState([])
  const [minDeliveryTime, setMinDeliveryTime] = useState({
    hours: 11,
    minutes: 0,
  })
  const [selectedDayIndex, setSelectedDayIndex] = useState(0)

  useEffect(() => {
    // Create days list
    const days = ['Сьогодні', 'Завтра']
    const today = new Date()
    for (let i = 2; i < 9; i++) {
      // Додаємо 7 днів до списку, починаючи з третього дня
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const options = { weekday: 'long', day: 'numeric', month: 'long' }
      const formattedDate = date.toLocaleDateString('uk-UA', options)
      days.push(formattedDate)
    }
    setDaysList(days)

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
    console.log('deliveryTimeOption-=-=-=', deliveryTimeOption, nextHour)
  }, [])

  const handleTimeOptionChange = (option) => {
    setDeliveryTimeOption(option)
    const now = new Date()
    now.setHours(now.getHours() + 1)
    const roundedMinutes = Math.ceil(now.getMinutes() / 10) * 10
    now.setMinutes(roundedMinutes)
    setSelectedTime(now)
    setShowTimePicker(option === 'selected')
    handleTimeFormData({
      deliveryTimeOption: option,
      selectedTime: now,
    })
  }

  const handleTimeChange = (time, dayIndex) => {
    console.log('time-----', time)
    console.log('dayIndex-----', dayIndex)
    setSelectedTime(time.toDate())
    setShowTimePicker(true)
    handleTimeFormData({
      deliveryTimeOption,
      selectedTime: time.toDate() + 1,
      selectedDate: daysList[dayIndex],
    })
  }

  const handleDayChange = (dayIndex) => {
    setSelectedDayIndex(dayIndex)
    // handle day change here
    console.log('Selected day:', daysList[dayIndex])

    const dateFromIndex = (index) => {
      const today = new Date()
      const selectedDate = new Date(
        today.getTime() + index * 24 * 60 * 60 * 1000
      ) // Додаємо кількість мілісекунд в один день за кожен індекс
      const day = selectedDate.getDate()
      const month = selectedDate.getMonth() + 1 // Місяці починаються з 0
      const year = selectedDate.getFullYear()
      return `${day}.${month}.${year}`
    }

    handleTimeFormData({
      deliveryTimeOption,
      selectedTime,
      selectedDate: dateFromIndex(dayIndex),
    })

    // Оновити selectedTime якщо він є
    if (selectedTime) {
      setSelectedTime(
        new Date(
          selectedTime.setHours(minDeliveryTime.hours, minDeliveryTime.minutes)
        )
      )
    }

    // Перевірка, чи обрано сьогоднішній день
    if (daysList[dayIndex] !== 'Сьогодні') {
      // Якщо обрано не сьогодні, змінюємо мінімальний час на 11 годин
      setMinDeliveryTime({ hours: 11, minutes: 0 })
      // Оновіть minDate у вашому стані, щоб зробити цей час доступним як мінімальний для Datetime
      setSelectedTime(new Date(selectedTime.setHours(11, 0)))
    } else {
      const now = new Date()
      const currentHour = now.getHours()
      if (currentHour >= 11 && currentHour < 22) {
        // Якщо поточний час між 11:00 і 21:59, можна приймати замовлення до 22:50
        if (minDeliveryTime.hours !== currentHour + 1) {
          setMinDeliveryTime({ hours: currentHour + 1, minutes: 0 })
          setSelectedTime(new Date(selectedTime.setHours(currentHour + 1, 0)))
        }
      } else {
        // В іншому випадку, можна приймати замовлення до 22:50 на наступний день
        if (minDeliveryTime.hours !== 11) {
          setMinDeliveryTime({ hours: 11, minutes: 0 })
          // Оновіть minDate у вашому стані, щоб зробити цей час доступним як мінімальний для Datetime
          setSelectedTime(new Date(selectedTime.setHours(11, 0)))
        }
      }
    }
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
        onChange={() => handleTimeOptionChange('nearest')}
      />
      <label htmlFor='nearestDelivery'>На найближчий час</label>

      <input
        type='radio'
        id='selectedDelivery'
        name='deliveryTimeOption'
        value='selected'
        checked={deliveryTimeOption === 'selected'}
        onChange={() => handleTimeOptionChange('selected')}
      />
      <label htmlFor='selectedDelivery'>На вибраний час</label>

      {showTimePicker && (
        <div className='time-picker'>
          <p>Оберіть час доставки:</p>

          <div className='days-list'>
            <select
              onChange={(e) => {
                handleDayChange(e.target.value)
              }}
            >
              {daysList.map((day, index) => (
                <option key={index} value={index}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <Datetime
            onChange={(time) => handleTimeChange(time, selectedDayIndex)}
            input={false}
            dateFormat={false}
            timeFormat='HH:mm'
            closeOnSelect={false}
            timeConstraints={validHours}
            minDate={selectedTime}
            value={
              selectedTime
                ? selectedTime.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : ''
            }
          />
        </div>
      )}

      {selectedTime && deliveryTimeOption !== 'nearest' && (
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
