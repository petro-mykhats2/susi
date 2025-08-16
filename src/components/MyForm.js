import React, { useState } from 'react'

const MyForm = ({ onSubmit }) => {
  // Створюємо стани для полів форми
  const [formData, setFormData] = useState({
    name: '',
    phone: '', // Додано поле телефону
    email: '',
    message: '', // Перейменовано з comment на message для відповідності з API
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
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.message
    ) {
      setFormError('Будь ласка, заповніть всі поля!')
      return
    }

    // Передаємо дані в батьківський компонент
    onSubmit(formData)

    // Очищаємо форму після успішної відправки
    setFormData({
      name: '',
      phone: '',
      email: '',
      message: '',
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
          <label htmlFor='name'>Ім'я</label>
        </div>
        <div className='group'>
          <input
            type='tel'
            name='phone'
            placeholder='‎'
            onChange={handleInputChange}
            value={formData.phone} // Задаємо значення для інпутів
            required
          />
          <label htmlFor='phone'>Телефон</label>
        </div>
        <div className='group'>
          <input
            type='email'
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
            name='message'
            placeholder='‎'
            onChange={handleInputChange}
            rows='5'
            value={formData.message} // Задаємо значення для інпутів
            required
          />
          <label htmlFor='message'>Напишіть текст</label>
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
