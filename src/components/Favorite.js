import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromFavorite } from '../redux/favorite'
import ItemProductCategory from './ItemProductCategory'

const FavoriteItems = () => {
  // Отримуємо дані зі стору про улюблені товари
  const favoriteItems = useSelector((state) => state.favorite.favoriteItems)
  const dispatch = useDispatch()

  const handleRemoveFromFavorite = (productId) => {
    dispatch(removeFromFavorite(productId))
  }

  // Загальна кількість улюблених товарів
  const totalFavoriteItems = favoriteItems.length

  return (
    <div>
      {totalFavoriteItems > 0 ? (
        <h4>Загальна кількість товарів в улюблених: {totalFavoriteItems}</h4>
      ) : (
        <h4>Поки що у вас немає товарів в цьому списку</h4>
      )}

      <div className='menuCategory-container'>
        {favoriteItems.map((product) => (
          <div className='menuCategory-favorite' key={product.id}>
            <ItemProductCategory
              orderdata={product}
              handleRemoveFromFavorite={handleRemoveFromFavorite}
            />
            <button onClick={() => handleRemoveFromFavorite(product)}>
              Видалити з улюблених{' '}
            </button>{' '}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FavoriteItems
