// gatsby-ssr.js
import React from 'react'
import { Provider } from 'react-redux'
import store from './src/redux/state/store'

export const wrapRootElement = ({ element }) => (
  <Provider store={store}>{element}</Provider>
)
