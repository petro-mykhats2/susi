import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../cart' // Your root reducer

const store = configureStore({
  reducer: {
    cart: cartReducer,
    // Add other reducers as needed
  },
})

export default store
