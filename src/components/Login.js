import React, { useState } from 'react'

function Login({ setLoggedIn }) {
  // Приймаємо пропс для зміни стану авторизації
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = { username, password }

    try {
      const response = await fetch('/.netlify/functions/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to login')
      }

      setUsername('')
      setPassword('')
      setLoggedIn(true) // Після успішного входу змінюємо стан авторизації

      console.log('Успішно зайдено')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <span>Увійти</span>
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
      {error && <p>{error}</p>}
    </div>
  )
}

export default Login
