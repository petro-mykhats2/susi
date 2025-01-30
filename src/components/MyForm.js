import React, { useState } from 'react'

const MyForm = () => {
  // Створюємо стани для полів форми
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
  })

  const [formError, setFormError] = useState(null) // Для відображення помилок

  // Обробник зміни значення полів форми
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Оновлюємо відповідне поле
    }))
  }

  // Обробник відправки форми
  const handleSubmit = (event) => {
    event.preventDefault()
    setFormError(null) // Скидаємо попередні помилки

    // Перевірка, чи заповнені всі поля
    if (!formData.name || !formData.email || !formData.comment) {
      setFormError('Будь ласка, заповніть всі поля!')
      return
    }

    // Логіка відправки форми (наприклад, до сервера)
    alert('Форма відправлена!')

    // Очищаємо форму після успішної відправки
    setFormData({
      name: '',
      email: '',
      comment: '',
    })
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

        {/* Кнопка відправки */}
        <button type='submit'>Відправити</button>
      </form>

      {/* Виведення помилок, якщо є */}
      {formError && <div style={{ color: 'red' }}>{formError}</div>}
    </div>
  )
}

export default MyForm
