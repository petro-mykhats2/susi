// src/components/ProtectedPage.js
import React, { useState, useEffect } from 'react'

const ProtectedPage = () => {
  const [userData, setUserData] = useState(null)

  // Функція для отримання захищених даних
  const fetchProtectedData = async () => {
    const token = localStorage.getItem('token') // Отримуємо токен з localStorage

    if (!token) {
      console.log('Токен відсутній')
      return
    }

    try {
      const response = await fetch('/.netlify/functions/protected-route', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Додаємо токен до заголовків
        },
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message) // Якщо сервер повертає помилку
      }

      console.log('Захищені дані:', result)
      setUserData(result.user) // Зберігаємо дані користувача в state
    } catch (error) {
      console.error('Помилка при запиті захищених даних:', error)
    }
  }

  // Викликаємо функцію для отримання даних при завантаженні компоненту
  useEffect(() => {
    fetchProtectedData()
  }, [])

  // Функція для виходу з системи
  const handleLogout = () => {
    localStorage.removeItem('token') // Видаляємо токен з localStorage
    setUserData(null) // Оновлюємо стейт, щоб позначити, що користувач вийшов
    console.log('Користувач вийшов з системи')
  }

  return (
    <div>
      {userData ? (
        <>
          <p>Вітаємо, {userData.username}!</p> {/* Виводимо ім'я користувача */}
          <button onClick={handleLogout}>Вийти</button> {/* Кнопка для виходу */}
        </>
      ) : (
        <p>Завантаження захищених даних...</p> // Показуємо повідомлення під час завантаження
      )}
    </div>
  )
}

export default ProtectedPage
