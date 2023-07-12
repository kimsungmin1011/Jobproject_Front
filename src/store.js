import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : 'kim'
})

let id = createSlice({
  name : 'id',
  initialState : 1
})

let cart = createSlice({
    name : 'cart',
    initialState : [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ]
  })

export default configureStore({
  reducer: { 
    user : user.reducer,
    cart : cart.reducer
  }
}) 