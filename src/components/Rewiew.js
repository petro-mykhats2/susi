import React, { useState, useEffect } from 'react'
import ReviewForm from './ReviewForm'

const Reviews = () => {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 5,
    text: '',
  })

  // Fetch reviews from database
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/.netlify/functions/sendReview')
        const data = await response.json()

        if (!response.ok) {
          throw new Error('Failed to fetch reviews')
        }

        setReviews(data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching reviews:', err)
        setError('Помилка при завантаженні відгуків')
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  // Calculate overall rating
  const overallRating =
    reviews.length > 0
      ? {
          score: (
            reviews.reduce((sum, review) => sum + review.rating, 0) /
            reviews.length
          ).toFixed(1),
          count: reviews.length,
        }
      : { score: 0, count: 0 }

  if (loading) return <div>Завантаження відгуків...</div>
  if (error) return <div>{error}</div>

  return (
    <div className='reviews-section'>
      <div className='reviews-header'>
        <div className='reviews-title'>Відгуки про товар</div>
        <div className='overall-rating'>
          <div className='rating-number'>{overallRating.score}</div>
          <div className='stars'>
            {[...Array(5)].map((_, i) => (
              <div key={i} className='star'>
                ★
              </div>
            ))}
          </div>
          <div className='rating-count'>({overallRating.count})</div>
        </div>
        <button
          className='write-review-btn'
          onClick={() => setShowReviewForm(true)}
        >
          Залишити відгук
        </button>
      </div>

      {showReviewForm && (
        <div className='review-form'>
          <ReviewForm
            newReview={newReview}
            setNewReview={setNewReview}
            onCancel={() => setShowReviewForm(false)}
          />
        </div>
      )}

      {reviews.map((review, index) => (
        <div key={index} className='review-item'>
          <div className='review-header'>
            <div className='review-author'>{review.author}</div>
            <div className='review-date'>{review.date}</div>
          </div>
          <div className='review-rating'>
            <div className='stars'>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className='star'
                  style={i >= review.rating ? { color: '#ccc' } : {}}
                >
                  ★
                </div>
              ))}
            </div>
          </div>
          <div className='review-text'>{review.text}</div>
          {review.photos && (
            <div className='review-photos'>
              {review.photos.map((photo, photoIndex) => (
                <div key={photoIndex} className='review-photo'>
                  <img src={photo} alt='Фото відгуку' />
                </div>
              ))}
            </div>
          )}
          <button className='helpful-btn'>
            Корисний відгук ({review.helpfulCount})
          </button>
        </div>
      ))}
    </div>
  )
}

export default Reviews
