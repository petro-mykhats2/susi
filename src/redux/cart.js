const initialState = {
  cartItems: [],
  total: 0,
}

export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
export const CLEAR_CART = 'CLEAR_CART'

export const addToCart = (product, counter) => {
  const quantity = counter ? counter : 1
  return {
    type: ADD_TO_CART,
    payload: {
      id: product.id,
      name: product.frontmatter.title,
      img: product.frontmatter.image,
      price: product.frontmatter.price,
      quantity: quantity,
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
            return { ...item, quantity: item.quantity + addedItem.quantity } // Збільшуємо кількість на ту, яку вибрав користувач
          }
          return item
        })

        return {
          ...state,
          cartItems: updatedCartItems,
          total: state.total + addedItem.price * addedItem.quantity, // Додаємо ціну, помножену на кількість
        }
      } else {
        // Якщо товару немає у корзині, додаємо його в список товарів
        const newCartItems = [...state.cartItems, addedItem]

        return {
          ...state,
          cartItems: newCartItems,
          total: state.total + addedItem.price * addedItem.quantity, // Додаємо ціну, помножену на кількість
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
          const updatedItem = { ...item, quantity: quantity }
          if (quantity <= 0) {
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
