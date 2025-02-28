import React, { useState, useEffect } from 'react'

const Reviews = ({ productId }) => {
  // ... existing states ...

  // Оновлюємо fetchReviews для роботи з productId
  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `/.netlify/functions/sendReview?productId=${productId}`
      )
      const data = await response.json()

      if (!response.ok) {
        throw new Error('Failed to fetch reviews')
      }

      const sortedReviews = data.sort((a, b) => {
        const dateA = new Date(a.date.split('.').reverse().join('-'))
        const dateB = new Date(b.date.split('.').reverse().join('-'))
        return dateB - dateA
      })

      setReviews(sortedReviews)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching reviews:', err)
      setError('Помилка при завантаженні відгуків')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [productId]) // Додаємо productId в залежності

  // Оновлюємо початковий стан відгуку
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 5,
    text: '',
    productId: productId, // Додаємо productId до нового відгуку
  })

  // ... rest of the component code
}

export default Reviews
