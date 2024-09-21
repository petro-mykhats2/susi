import React, { useState } from 'react'

const PromoCodeChecker = ({ onApplyPromoCode }) => {
  const [code, setCode] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleCheckPromoCode = async () => {
    try {
      const response = await fetch('/.netlify/functions/promocodes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data)
        setError(null)

        // Викликаємо onApplyPromoCode, передаючи значення знижки
        if (data.discountValue) {
          onApplyPromoCode(data.discountValue) // передаємо % знижки
        } else {
          onApplyPromoCode(0) // якщо знижки немає
        }
      } else {
        setError(data.message)
        setResult(null)
        onApplyPromoCode(0) // скидаємо знижку до 0, якщо код неправильний
      }
    } catch (error) {
      setError('An error occurred')
      setResult(null)
      onApplyPromoCode(0) // скидаємо знижку до 0 у разі помилки
    }
  }

  return (
    <div className='form-field promocode-block'>
      <div className='promocode'>
        <input
          placeholder='Введіть код на знижку'
          type='text'
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type='button' onClick={handleCheckPromoCode}>
          Перевірити
        </button>
      </div>

      {result && (
        <div className='promocode-message'>
          {result.discountType && (
            <div>
              <img
                className='promocode-message-image'
                src='/img/success.svg'
                alt='success'
              />
              <span> Знижка за цим промокодом: {result.discountValue} %</span>
            </div>
          )}
        </div>
      )}
      {error && (
        <p className='promocode-error'>
          <img
            className='promocode-message-image'
            src='/img/alert.svg'
            alt='error'
          />
          На жаль, цей код недійсний. Переконайтеся, що ви ввели його правильно.
        </p>
      )}
    </div>
  )
}

export default PromoCodeChecker
