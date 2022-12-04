import React from 'react'

function Product({ pageContext }) {
  const { alldata } = pageContext

  return (
    <div className='product'>
      <div className='bone'>
        <div className='product-top'>
          <div className='product-img'>
            <div className='product-favorite'>W</div>
            {/* <img src={alldata.image} /> */}
          </div>
          <div className='product-right'>
            <div className='product-right'></div>
          </div>
        </div>
        <div className='product-info'>
          Метка — это ключевое слово, позволяющее отнести ваш вопрос в одну
          категорию с другими похожими вопросами. Благодаря подбору правильных
          меток другие участники смогут проще найти ваш вопрос и быстрее дать на
          него ответ. Показать все синонимы меток
        </div>
      </div>
    </div>
  )
}

export default Product
