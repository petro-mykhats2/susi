import React from 'react'

function Product({ pageContext }) {
  const { alldata } = pageContext

  return (
    <div className='product'>
      <div className='bone'>
        <div className='product-top'>
          <div className='product-img'>
            <div className='product-favorite'>
              <img src='/img/favorite.png' alt='imagee' />
            </div>
            <img src={alldata.image} />
          </div>
          <div className='product-right'>
            <div className='product-name'>Філадельфія в Кунжуті</div>
            <div className='product-label'>Кількість:</div>
            <div className='product-label_under'>8 шт</div>
            <div className='product-label'>Вага:</div>
            <div className='product-label_under'>285г</div>
            <div className='product-label'>Склад:</div>
            <div className='product-label_under product-slider'>Slider</div>
            <div className='product-right_bottom'>
              <div className='product-right_bottom_left'>
                <div className='product-price'>653.50 грн</div>
                <div className='product-calc'>
                  <div className='product-calc_less'>-</div>
                  <div className='product-calc_counter'>1</div>
                  <div className='product-calc_less'>+</div>
                </div>
              </div>
              <div className='product-right_bottom_right'>
                <div className='product_button'>
                  <div className='product_button_img'>
                    <img src='/img/shopping-cart.png' alt='imagee' />
                  </div>
                  <div className='product_button_text'>В КОШИК</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='product-info'>
          Метка — это ключевое слово, позволяющее отнести ваш вопрос в одну
          категорию с другими похожими вопросами. Благодаря подбору правильных
          меток другие участники смогут проще найти ваш вопрос и быстрее дать на
          него ответ. Показать все синонимы метокМетка — это ключевое слово,
          позволяющее отнести ваш вопрос в одну категорию с другими похожими
          вопросами. Благодаря подбору правильных меток другие участники смогут
          проще найти ваш вопрос и быстрее дать на него ответ. Показать все
          синонимы метокМетка — это ключевое слово, позволяющее отнести ваш
          вопрос в одну категорию с другими похожими вопросами. Благодаря
          подбору правильных меток другие участники смогут проще найти ваш
          вопрос и быстрее дать на него ответ. Показать все синонимы меток
        </div>
      </div>
    </div>
  )
}

export default Product
