import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cartReducer from '../cart'

const persistConfig = {
  key: 'root',
  storage: storage,
}
console.log('persistConfig', persistConfig)

const rootReducer = combineReducers({
  cart: persistReducer(persistConfig, cartReducer),
})

const store = configureStore({
  reducer: rootReducer,
  middleware: [],
})

const persistor = persistStore(store)

export { store, persistor }
