import React, { useState } from 'react'
import GetDatasFromDatabase from './GetDatasFromDatabase' // Імпорт компонента GetDatasFromDatabase

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false) // Заміни стейт loggedInUser на loggedIn

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Створення об'єкта з даними для відправки на сервер
    const formData = {
      username: username,
      password: password,
    }

    try {
      const response = await fetch('/.netlify/functions/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to login')
      }

      // Очищення полів вводу після успішного входу
      setUsername('')
      setPassword('')

      // Помітка про успішний вхід
      setLoggedIn(true)

      // Повідомлення про успішний вхід можна також додати, якщо потрібно
      console.log('Успішно зайдено')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <span>Увійти</span>
      {/* Умовний рендеринг для відображення компонента GetDatasFromDatabase при успішному вході */}
      {loggedIn && <GetDatasFromDatabase loggedIn={true} />}
      {!loggedIn && (
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder="Ім'я користувача"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            placeholder='Пароль'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>Увійти</button>
        </form>
      )}
      {error && <p>{error}</p>}
    </div>
  )
}

export default Login
