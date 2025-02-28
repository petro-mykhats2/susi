// import React, { useState } from 'react'
// import ReviewForm from './ReviewForm'

// const Reviews = () => {
//   const [showReviewForm, setShowReviewForm] = useState(false)
//   const [newReview, setNewReview] = useState({
//     author: '',
//     rating: 5,
//     text: '',
//   })

//   const handleSubmitReview = (e) => {
//     e.preventDefault()
//     // Логіка відправки відгуку
//     setShowReviewForm(false)
//     setNewReview({ author: '', rating: 5, text: '' })
//   }

//   return (
//     <div className='reviews-section'>
//       <div className='reviews-header'>
//         <h2 className='reviews-title'>Відгуки</h2>
//         <button
//           className='write-review-btn'
//           onClick={() => setShowReviewForm(true)}
//         >
//           Залишити відгук!!!
//         </button>
//       </div>

//       {showReviewForm && (
//         <ReviewForm
//           newReview={newReview}
//           setNewReview={setNewReview}
//           onSubmit={handleSubmitReview}
//           onCancel={() => setShowReviewForm(false)}
//         />
//       )}

//       {/* Існуючі відгуки */}
//     </div>
//   )
// }

// export default Reviews
