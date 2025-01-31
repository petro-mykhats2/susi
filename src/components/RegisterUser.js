import React, { useState } from 'react'

function RegisterUser() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (username.trim() === '' || password.length < 6) {
      setError(
        "Ім'я не може бути порожнім, а пароль повинен містити мінімум 6 символів"
      )
      return
    }

    const formData = { username, password }

    try {
      const response = await fetch('/.netlify/functions/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Помилка реєстрації')
      }

      setSuccess('Реєстрація успішна!')
      setUsername('')
      setPassword('')
      setError(null)
    } catch (error) {
      setError(error.message)
      setSuccess(null)
    }
  }

  return (
    <div>
      <h2>Реєстрація</h2>
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  )
}

export default RegisterUser
