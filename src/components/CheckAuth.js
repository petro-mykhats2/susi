import React, { useState, useEffect } from 'react'
import GetDatasFromDatabase from './GetDatasFromDatabase'

const CheckAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const checkAuth = async () => {
    const token = localStorage.getItem('token') // Отримуємо токен з localStorage

    if (!token) {
      setLoggedIn(false) // Якщо токен відсутній
      return
    }

    try {
      // Відправляємо запит до захищеного маршруту на сервері
      const response = await fetch('/.netlify/functions/protected-route', {
        headers: { Authorization: `Bearer ${token}` }, // Додаємо токен до заголовка
      })

      if (!response.ok) {
        throw new Error('Токен недійсний або авторизація не пройшла')
      }

      const result = await response.json()

      setUser(result.user) // Встановлюємо користувача після успішної авторизації
      setLoggedIn(true) // Якщо токен дійсний
    } catch (error) {
      localStorage.removeItem('token') // Видаляємо недійсний токен
      setLoggedIn(false) // Якщо виникла помилка, вважаємо користувача не авторизованим
    }
  }

  const handleLogout = () => {
    // Видаляємо токен з localStorage
    localStorage.removeItem('token')
    setLoggedIn(false) // Оновлюємо стан
    setUser(null) // Очистимо дані користувача
  }

  useEffect(() => {
    checkAuth() // Перевіряємо автентифікацію при завантаженні компонента
  }, [])

  return (
    <div>
      {loggedIn ? (
        <div>
          <p>Ви авторизовані!</p>
          <p>Вітаємо, {user?.username}!</p>
          {/* Кнопка виходу */}
          <button onClick={handleLogout}>Вийти</button>
          <GetDatasFromDatabase />
        </div>
      ) : (
        <p>Ви не авторизовані. Будь ласка, увійдіть.</p>
      )}
    </div>
  )
}

export default CheckAuth
