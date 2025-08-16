import React, { useState, useEffect } from 'react'
import ReviewForm from './ReviewForm'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Reviews = ({ productId }) => {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const reviewsPerPage = 4

  const [newReview, setNewReview] = useState({
    author: '',
    rating: 0,
    text: '',
    productId: productId,
  })

  // Fetch reviews for specific product
  const fetchReviews = async () => {
    try {
      if (!productId) {
        setLoading(false)
        return
      }

      const response = await fetch(
        `/.netlify/functions/sendReview?productId=${productId}`
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error('Failed to fetch reviews')
      }

      // Сортуємо відгуки за датою (найновіші спочатку)
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
  }, [productId])

  // Оновлюємо початковий стан при зміні productId
  useEffect(() => {
    if (productId) {
      setNewReview((prev) => ({
        ...prev,
        productId: productId,
      }))
    }
  }, [productId])

  // Перевіряємо кількість коментарів користувача для цього товару
  const checkUserReviewLimit = () => {
    const userReviews = JSON.parse(localStorage.getItem('userReviews') || '{}')
    const productReviews = userReviews[productId] || 0
    return productReviews >= 3
  }

  // Оновлюємо лічильник коментарів користувача
  const incrementUserReviewCount = () => {
    const userReviews = JSON.parse(localStorage.getItem('userReviews') || '{}')
    userReviews[productId] = (userReviews[productId] || 0) + 1
    localStorage.setItem('userReviews', JSON.stringify(userReviews))
  }

  const handleReviewSuccess = () => {
    incrementUserReviewCount()
    fetchReviews()
    setShowReviewForm(false)

    setNewReview({
      author: '',
      rating: 0,
      text: '',
      productId: productId,
    })
  }

  // Модифікуємо рендер кнопки "Залишити відгук"
  const renderReviewButton = () => {
    if (checkUserReviewLimit()) {
      return (
        <div className='review-limit-warning'>
          Ви досягли ліміту відгуків для цього товару (максимум 3)
        </div>
      )
    }
    return (
      <button
        className='write-review-btn'
        onClick={() => setShowReviewForm(true)}
      >
        Залишити відгук
      </button>
    )
  }

  const handleHelpfulClick = async (reviewId) => {
    const votedReviews = JSON.parse(
      localStorage.getItem('votedReviews') || '[]'
    )

    if (votedReviews.includes(reviewId)) {
      toast.info('Ви вже оцінили цей відгук')
      return
    }

    // Оптимістичне оновлення UI
    setReviews((currentReviews) =>
      currentReviews.map((review) =>
        review._id === reviewId
          ? { ...review, helpfulCount: (review.helpfulCount || 0) + 1 }
          : review
      )
    )

    // Зберігаємо ID відгуку в localStorage оптимістично
    localStorage.setItem(
      'votedReviews',
      JSON.stringify([...votedReviews, reviewId])
    )

    try {
      // console.log('Sending helpful vote for review:', reviewId)

      const response = await fetch('/.netlify/functions/sendReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'incrementHelpful',
          reviewId: reviewId,
        }),
      })

      const data = await response.json()
      console.log('Response:', data)

      if (!response.ok) {
        throw new Error(data.message || 'Помилка при оцінюванні відгуку')
      }

      if (data.matchedCount === 0) {
        throw new Error('Відгук не знайдено')
      }

      toast.success('Дякуємо за вашу оцінку!')
    } catch (error) {
      console.error('Error:', error)

      // Відкат оптимістичного оновлення у випадку помилки
      setReviews((currentReviews) =>
        currentReviews.map((review) =>
          review._id === reviewId
            ? { ...review, helpfulCount: (review.helpfulCount || 0) - 1 }
            : review
        )
      )

      // Відкат localStorage
      localStorage.setItem(
        'votedReviews',
        JSON.stringify(votedReviews.filter((id) => id !== reviewId))
      )

      toast.error(error.message || 'Помилка при оцінюванні відгуку')
    }
  }

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

  // Розрахунок пагінації
  const indexOfLastReview = currentPage * reviewsPerPage
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview)
  const totalPages = Math.ceil(reviews.length / reviewsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    // Прокручуємо до початку секції відгуків
    document
      .querySelector('.reviews-section')
      .scrollIntoView({ behavior: 'smooth' })
  }

  if (loading && productId) return <div>Завантаження відгуків...</div>
  if (error) return <div>{error}</div>
  if (!productId) return <div>Помилка: ID товару не вказано</div>

  return (
    <div className='reviews-section'>
      <ToastContainer position='top-right' autoClose={3000} />
      <div className='reviews-header'>
        {/* <div className='reviews-title'></div> */}
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
        {renderReviewButton()}
      </div>

      {showReviewForm && !checkUserReviewLimit() && (
        <ReviewForm
          newReview={newReview}
          setNewReview={setNewReview}
          onCancel={() => setShowReviewForm(false)}
          onSuccess={handleReviewSuccess}
        />
      )}

      {reviews.length === 0 ? (
        <div className='no-reviews'>
          <p>Цей товар ще не має відгуків.</p>
          <p>Будьте першим, хто залишить відгук!</p>
          {!showReviewForm && !checkUserReviewLimit() && (
            <button
              className='write-review-btn'
              onClick={() => setShowReviewForm(true)}
            >
              Написати відгук
            </button>
          )}
        </div>
      ) : (
        <>
          {currentReviews.map((review) => (
            <div key={review._id} className='review-item'>
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
              <button
                className={`helpful-btn ${
                  JSON.parse(
                    localStorage.getItem('votedReviews') || '[]'
                  ).includes(review._id.toString())
                    ? 'voted'
                    : ''
                }`}
                onClick={() => handleHelpfulClick(review._id.toString())}
              >
                Корисний відгук ({review.helpfulCount || 0})
              </button>
            </div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='pagination'>
              {/* Кнопка "Назад" */}
              {currentPage > 1 && (
                <div
                  className='page-btn'
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  ←
                </div>
              )}

              {/* Номери сторінок */}
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1
                // Показуємо тільки поточну сторінку та по 2 сторінки з кожного боку
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 2 &&
                    pageNumber <= currentPage + 2)
                ) {
                  return (
                    <div
                      key={pageNumber}
                      className={`page-btn ${
                        currentPage === pageNumber ? 'active' : ''
                      }`}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </div>
                  )
                } else if (
                  pageNumber === currentPage - 3 ||
                  pageNumber === currentPage + 3
                ) {
                  // Показуємо три крапки для пропущених сторінок
                  return (
                    <div key={pageNumber} className='page-dots'>
                      ...
                    </div>
                  )
                }
                return null
              })}

              {/* Кнопка "Вперед" */}
              {currentPage < totalPages && (
                <div
                  className='page-btn'
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  →
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Reviews
