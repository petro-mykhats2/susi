const initialState = {
  favoriteItems: [],
}

export const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE'
export const REMOVE_FROM_FAVORITE = 'REMOVE_FROM_FAVORITE'

export const addToFavorite = (product) => {
  console.log('=========product', product)
  return {
    type: ADD_TO_FAVORITE,
    payload: product,
  }
}

export const removeFromFavorite = (product) => {
  return {
    type: REMOVE_FROM_FAVORITE,
    payload: product.frontmatter.title,
  }
}

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITE:
      const existingIndex = state.favoriteItems.findIndex(
        (item) => item.id === action.payload.id
      )
      if (existingIndex !== -1) {
        // Якщо продукт вже є у списку улюблених, не додавати його знову
        return state
      }
      // Додати новий продукт до списку улюблених
      return {
        ...state,
        favoriteItems: [...state.favoriteItems, action.payload],
      }
    case REMOVE_FROM_FAVORITE:
      // Видалити продукт зі списку улюблених за його id
      return {
        ...state,
        favoriteItems: state.favoriteItems.filter(
          (item) =>
            item.frontmatter && item.frontmatter.title !== action.payload
        ),
      }

    default:
      return state
  }
}

export default favoriteReducer
