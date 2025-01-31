import React, { useState } from 'react'

function RegisterUser() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Створення об'єкта з даними для відправки на сервер
    const formData = {
      username: username,
      password: password,
    }

    try {
      console.log('Дані, які відправляються на сервер:', formData) // Додайте цей рядок

      const response = await fetch('/.netlify/functions/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to register')
      }

      // Очищення полів вводу після успішної реєстрації
      setUsername('')
      setPassword('')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <span>Зараєструватись</span>
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
        <button type='submit'>Зареєструватися</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default RegisterUser
