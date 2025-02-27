import React from 'react'

const Reviews = () => {
  return (
    <div className='reviews-section'>
      <div class='reviews-header'>
        <div class='reviews-title'>Відгуки про товар</div>
        <div class='overall-rating'>
          <div class='rating-number'>4.8</div>
          <div class='stars'>
            <div class='star'>★</div>
            <div class='star'>★</div>
            <div class='star'>★</div>
            <div class='star'>★</div>
            <div class='star'>★</div>
          </div>
          <div class='rating-count'>(45)</div>
        </div>
        <button class='write-review-btn'>Залишити відгук</button>
      </div>
      <div className='review-item'>
        <div className='review-header'>
          <div className='review-author'>Марія П.</div>
          <div className='review-date'>15.01.2025</div>
        </div>
        <div className='review-rating'>
          <div className='stars'>
            <div className='star'>★</div>
            <div className='star'>★</div>
            <div className='star'>★</div>
            <div className='star'>★</div>
            <div className='star' style={{ color: '#ccc' }}>
              ★
            </div>
          </div>
        </div>
        <div className='review-text'>
          Загалом філадельфія непогана, але хотілося б трохи більше авокадо.
          Лосось свіжий, рис не розварений. Доставили вчасно. Буду замовляти ще,
          але спробую інші роли з їхнього меню.
        </div>
        <button className='helpful-btn'>Корисний відгук (5)</button>
      </div>

      <div className='review-item'>
        <div className='review-header'>
          <div className='review-author'>Іванна Д.</div>
          <div className='review-date'>02.02.2025</div>
        </div>
        <div className='review-rating'>
          <div className='stars'>
            <div className='star'>★</div>
            <div className='star'>★</div>
            <div className='star'>★</div>
            <div className='star'>★</div>
            <div className='star'>★</div>
          </div>
        </div>
        <div className='review-text'>
          Найкраща філадельфія в місті! Замовила на день народження, усі гості
          були в захваті. Інгредієнти першокласні, порція досить велика. Окремо
          хочу відзначити гарну презентацію та упаковку. Рекомендую!
        </div>
        <div className='review-photos'>
          <div className='review-photo'>
            <img src='/img/kryvetka.png' alt='Фото відгуку' />
          </div>
        </div>
        <button className='helpful-btn'>Корисний відгук (8)</button>
      </div>

      <div className='pagination'>
        <div className='page-btn active'>1</div>
        <div className='page-btn'>2</div>
        <div className='page-btn'>3</div>
        <div className='page-btn'>4</div>
        <div className='page-btn'>5</div>
      </div>
    </div>
  )
}
export default Reviews
