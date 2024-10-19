import React from 'react'
import useSiteSettings from '../hooks/useSiteSettings'

const PhoneLink = () => {
  const siteSetting = useSiteSettings()
  const phone = siteSetting.contact_phone // Динамічний номер телефону

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
        return `skype:${phone}?call`
      case 'MacOS':
        // FaceTime для macOS
        return `facetime:${phone}`
      case 'Android':
      case 'iOS':
        // Стандартне телефонне посилання для мобільних пристроїв
        return `tel:${phone}`
      default:
        // Стандартне телефонне посилання для всіх інших випадків
        return `tel:${phone}`
    }
  }

  return (
    <p>
      <strong>Телефон:</strong>
      <a href={getPhoneLink()}>{phone}</a>
    </p>
  )
}

export default PhoneLink
