const initialState = {
  cartItems: [],
  total: 0,
}

export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
export const CLEAR_CART = 'CLEAR_CART'

export const addToCart = (product) => {
  console.log('product який додався до корзини', product)
  return {
    type: ADD_TO_CART,
    payload: {
      id: product.id,
      name: product.frontmatter.title,
      img: product.frontmatter.image,
      price: parseFloat(product.frontmatter.price.replace(' грн', '')), // конвертуємо ціну в число

      quantity: 1,
    },
  }
}

export const removeFromCart = (product) => {
  return {
    type: REMOVE_FROM_CART,
    payload: {
      id: product.id,
    },
  }
}

export const changeQuantity = (product, quantity) => {
  return {
    type: CHANGE_QUANTITY,
    payload: {
      id: product.id,
      quantity: quantity,
    },
  }
}

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  }
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
        total: 0,
      }

    case 'ADD_TO_CART':
      // Додаємо новий товар до корзини
      const addedItem = action.payload
      const itemInCart = state.cartItems.find(
        (item) => item.id === addedItem.id
      )

      if (itemInCart) {
        // Якщо товар вже є у корзині, збільшуємо його кількість на 1
        const updatedCartItems = state.cartItems.map((item) => {
          if (item.id === addedItem.id) {
            return { ...item, quantity: item.quantity + 1 }
          }
          return item
        })

        return {
          ...state,
          cartItems: updatedCartItems,
          total: state.total + addedItem.price,
        }
      } else {
        // Якщо товару немає у корзині, додаємо його в список товарів
        const newCartItems = [...state.cartItems, { ...addedItem, quantity: 1 }]

        return {
          ...state,
          cartItems: newCartItems,
          total: state.total + addedItem.price,
        }
      }
    case 'REMOVE_FROM_CART':
      // Видаляємо товар з корзини
      const removedItem = action.payload
      const remainingCartItems = state.cartItems.filter(
        (item) => item.id !== removedItem.id
      )

      return {
        ...state,
        cartItems: remainingCartItems,
        total: state.total - removedItem.price * removedItem.quantity,
      }
    case 'CHANGE_QUANTITY':
      const { id, quantity } = action.payload
      const updatedCartItems = state.cartItems.map((item) => {
        if (item.id === id) {
          // Зменшуємо кількість товару
          const updatedItem = { ...item, quantity: quantity }
          if (quantity <= 0) {
            // Якщо кількість стала менше або дорівнює 0, видаляємо товар з корзини
            return null
          } else {
            return updatedItem
          }
        }
        return item
      })

      const updatedCartItemsWithoutNull = updatedCartItems.filter(
        (item) => item !== null
      )

      return {
        ...state,
        cartItems: updatedCartItemsWithoutNull,
        total:
          state.total -
          quantity * state.cartItems.find((item) => item.id === id).price,
      }
    default:
      return state
  }
}

export default cartReducer
