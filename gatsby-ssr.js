import './src/scss/main.scss'
import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from './src/redux/state/store'

export const wrapRootElement = ({ element }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {element}
    </PersistGate>
  </Provider>
)
