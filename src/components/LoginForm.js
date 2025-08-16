import React, { useState } from 'react'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

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
      localStorage.setItem('token', result.token)

      setLoggedIn(true)
    } catch (error) {
      console.error('Login error:', error)
      setError(error.message)
    }
  }

  return (
    <div className='login-form'>
      <div className='login-form__container'>
        <p className='login-form__title'>Login</p>
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
        <p className='login-form__sign-up-label'>
          Don't have an account?
          <span className='login-form__sign-up-link'>Sign up</span>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
