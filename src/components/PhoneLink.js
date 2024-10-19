import React from 'react'

const PhoneLink = () => {
  // Функція для визначення операційної системи
  const getOperatingSystem = () => {
    const userAgent = window.navigator.userAgent
    if (/Windows/i.test(userAgent)) {
      return 'Windows'
    } else if (/Mac/i.test(userAgent)) {
      return 'MacOS'
    } else if (/Android/i.test(userAgent)) {
      return 'Android'
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      return 'iOS'
    } else {
      return 'Unknown'
    }
  }

  // Функція для створення посилання залежно від операційної системи
  const getPhoneLink = () => {
    const os = getOperatingSystem()

    switch (os) {
      case 'Windows':
        // Skype для Windows
        return 'skype:+380501234567?call'
      case 'MacOS':
        // FaceTime для macOS
        return 'facetime:+380501234567'
      case 'Android':
      case 'iOS':
        // Стандартне телефонне посилання для мобільних пристроїв
        return 'tel:+380501234567'
      default:
        // Стандартне телефонне посилання для всіх інших випадків
        return 'tel:+380501234567'
    }
  }

  return (
    <p>
      <strong>Телефон:</strong>
      <a href={getPhoneLink()}>+380 (50) 123-45-67</a>
    </p>
  )
}

export default PhoneLink
