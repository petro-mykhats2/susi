import React from 'react'
import { toast } from 'react-toastify'

const ReviewForm = ({ newReview, setNewReview, onSubmit, onCancel }) => {
  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent default form submission

    // Додаємо логування
    console.log('Attempting to send review:', newReview)

    // Validate required fields
    if (!newReview.author || !newReview.text || !newReview.rating) {
      toast.error('Будь ласка, заповніть всі поля')
      return
    }

    try {
      const reviewData = {
        ...newReview,
        date: new Date().toLocaleDateString('uk-UA'),
        helpfulCount: 0,
      }

      console.log('Sending data:', reviewData)

      const response = await fetch('/.netlify/functions/sendReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      })

      // Додаємо логування відповіді
      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (!response.ok) {
        throw new Error(data.message || 'Помилка при відправці відгуку')
      }

      toast.success('Відгук успішно додано!')

      // Reset form and close
      setNewReview({
        author: '',
        rating: 5,
        text: '',
      })
      onCancel() // Close form instead of onSubmit which is causing the error
    } catch (error) {
      toast.error('Помилка при відправці відгуку')
      console.error('Error:', error)
    }
  }

  return (
    <div className='review-form'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Ваше ім'я:</label>
          <input
            type='text'
            value={newReview.author}
            onChange={(e) =>
              setNewReview({ ...newReview, author: e.target.value })
            }
            required
          />
        </div>
        <div className='form-group'>
          <label>Оцінка:</label>
          <div className='rating-input'>
            {[5, 4, 3, 2, 1].map((star) => (
              <span
                key={star}
                className={`star ${newReview.rating >= star ? 'active' : ''}`}
                onClick={() => setNewReview({ ...newReview, rating: star })}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className='form-group'>
          <label>Ваш відгук:</label>
          <textarea
            value={newReview.text}
            onChange={(e) =>
              setNewReview({ ...newReview, text: e.target.value })
            }
            required
          />
        </div>
        <div className='form-buttons'>
          <button type='submit'>Відправити</button>
          <button type='button' onClick={onCancel}>
            Скасувати
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReviewForm
