import React from 'react'
import Layout from '../layout'
import { Link } from 'gatsby'

function Product({ pageContext }) {
  console.log('pageContext', pageContext)
  // Отримуємо список категорій з контексту
  const categories = pageContext.categories

  // Шукаємо категорію, яка відповідає `categoryProduct` поточного товару
  const currentCategory = categories.find(
    (category) => category.node.fields.slug === pageContext.categoryProduct
  )

  return (
    <Layout>
      <div className='breadcrumb'>
        <Link to='/'>Головна</Link>
        <span>{'>'}</span>
        <Link to={`/menu/`}>Меню</Link>
        <span>{'>'}</span>
        {/* Виводимо назву знайденої категорії, якщо така є */}
        {currentCategory && (
          <Link to={`/menu/${currentCategory.node.fields.slug}`}>
            {currentCategory.node.frontmatter.name}
          </Link>
        )}
        <span>{'>'}</span>
        <span>{pageContext.title}</span>
      </div>
      <div className='product'>
        <div className='product-top'>
          <div className='product-img'>
            <div className='product-favorite'>
              <img src='/img/favorite.png' alt='imagee' />
            </div>
            <img src={pageContext.image} />
          </div>
          <div className='product-right'>
            <div className='product-name'>{pageContext.title}</div>
            <div className='product-label'>Кількість:</div>
            <div className='product-label_under'>8 шт</div>
            <div className='product-label'>Вага:</div>
            <div className='product-label_under'>{pageContext.weight}</div>
            <div className='product-label'>
              Склад: {pageContext.product_composition}
            </div>

            <div className='product-label_under product-slider'>
              <div className='product-slider-item'>
                <div className='product-slider-item-img'>
                  <img src='/img/sety.png' alt='imagee' />
                </div>
                <div className='product-slider-item-title'>Продукт 1</div>
              </div>
              <div className='product-slider-item'>
                <div className='product-slider-item-img'>
                  <img src='/img/sety.png' alt='imagee' />
                </div>
                <div className='product-slider-item-title'>Продукт 2</div>
              </div>
              <div className='product-slider-item'>
                <div className='product-slider-item-img'>
                  <img src='/img/sety.png' alt='imagee' />
                </div>
                <div className='product-slider-item-title'>Продукт 3</div>
              </div>
            </div>
            <div className='product-right_bottom'>
              <div className='product-right_bottom_left'>
                <div className='product-price'>{pageContext.price}</div>
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
        <div className='product-info'>{pageContext.description}</div>
      </div>
    </Layout>
  )
}

export default Product
