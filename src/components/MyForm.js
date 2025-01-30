import React, { useState, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

const MyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
    recaptchaToken: '',
  })
  const [formError, setFormError] = useState(null)
  const [recaptchaError, setRecaptchaError] = useState(null)

  const recaptchaRef = useRef() // Додаємо реф для доступу до ReCAPTCHA

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleRecaptchaChange = (token) => {
    setFormData({ ...formData, recaptchaToken: token })
    setRecaptchaError(null) // Reset recaptcha error if token is received
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormError(null) // Reset form error messages

    if (!formData.recaptchaToken) {
      setRecaptchaError('reCAPTCHA is required')
      return
    }

    try {
      const response = await fetch('/.netlify/functions/recaptcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Server error')
      }

      alert('Form submitted successfully!')
      setFormData({
        name: '',
        email: '',
        comment: '',
        recaptchaToken: '',
      })

      // Очищаємо рекапчу після відправки
      recaptchaRef.current.reset() // Викликаємо метод reset() для очищення рекапчі
    } catch (error) {
      console.error('Error submitting form:', error)
      setFormError(error.message)
    }
  }

  return (
    <div className='card'>
      <span className='title'>Звяжіться з нами</span>
      <form onSubmit={handleSubmit} className='form'>
        <div className='group'>
          <input
            type='text'
            name='name'
            placeholder='‎'
            onChange={handleInputChange}
            value={formData.name} // Задаємо значення для інпутів
            required
          />
          <label htmlFor='name'>Імя</label>
        </div>
        <div className='group'>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='‎'
            onChange={handleInputChange}
            value={formData.email} // Задаємо значення для інпутів
            required
          />
          <label htmlFor='email'>Email</label>
        </div>
        <div className='group'>
          <textarea
            id='comment'
            name='comment'
            placeholder='‎'
            onChange={handleInputChange}
            rows='5'
            value={formData.comment} // Задаємо значення для інпутів
            required
          />
          <label htmlFor='comment'>Напишіть текст</label>
        </div>
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
          onChange={handleRecaptchaChange}
          ref={recaptchaRef} // Передаємо реф в ReCAPTCHA
        />
        <button type='submit'>Відправити</button>
      </form>

      {recaptchaError && <div style={{ color: 'red' }}>{recaptchaError}</div>}

      {formError && <div style={{ color: 'red' }}>{formError}</div>}
    </div>
  )
}

export default MyForm
