// components/LoginForm.js
import React, { useState } from 'react'
import CheckAuth from './CheckAuth'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loggedIn, setLoggedIn] = useState(false) // Додано для управління станом авторизації

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Використовуємо значення з полів форми
    const formData = { username, password }

    try {
      const response = await fetch('/.netlify/functions/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message)
      }

      console.log('Logged in successfully:', result.token)
      localStorage.setItem('token', result.token) // Зберігаємо токен в localStorage

      setLoggedIn(true) // Оновлюємо стан авторизації
    } catch (error) {
      console.error('Login error:', error)
      setError(error.message)
    }
  }

  return (
    <div>
      {!loggedIn ? (
        <>
          <div className='login-form'>
            <div className='login-form__container'>
              <p className='login-form__title'>Вхід для адміністраторів</p>
              <form className='login-form__form' onSubmit={handleSubmit}>
                <input
                  type='text'
                  className='login-form__input login-form__input--email'
                  placeholder='User Name'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type='password'
                  className='login-form__input login-form__input--password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className='login-form__error-message'>{error}</p>}
                <button type='submit' className='login-form__submit-btn'>
                  Log in
                </button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <CheckAuth /> // Після авторизації відображається компонент CheckAuth
      )}
    </div>
  )
}

export default Login
