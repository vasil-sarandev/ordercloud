/* eslint-disable no-underscore-dangle */
import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import {
  cartReducer as cart,
  initialStateCart,
  initialStateVenue,
  venueReducer as venue
} from '../venue'
import { createVenueReducer as createVenue, initialStateCreateVenue } from '../admin/create-venue'
import { categoryReducer as category, initialStateCategory } from '../admin/category'
import { productReducer as product, initialStateProduct } from '../admin/product'
import { appReducer as app, initialStateApp } from './app_ducks'

let store

const reducer = combineReducers({ app, venue, cart, createVenue, category, product })

const initStore = (preloadedState?) =>
  configureStore({
    reducer: {
      app,
      venue,
      cart,
      createVenue,
      category,
      product
    },
    middleware: [...getDefaultMiddleware({ serializableCheck: false })],
    // devTools: process.env.NODE_ENV !== 'production',
    devTools: true,
    preloadedState
  })

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState
    })
    // Reset the current store
    store = undefined
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store
  return _store
}

export const useStore = (initialState) => {
  const memoizedStore = useMemo(() => initializeStore(initialState), [initialState])
  return memoizedStore
}

export type RootState = ReturnType<typeof reducer>
export const initialStateStore: RootState = {
  app: initialStateApp,
  cart: initialStateCart,
  venue: initialStateVenue,
  createVenue: initialStateCreateVenue,
  category: initialStateCategory,
  product: initialStateProduct
}
// useless shit because you can't call store() after typeof
const _ = initStore()
export type AppDispatch = typeof _.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
