import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : 'kim'
})

let id = createSlice({
  name : 'id',
  initialState : 1
})


export const setId = (id) => ({
  type: 'SET_ID',
  id
});

export const idReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_ID':
      return action.id;
    default:
      return state;
  }
};

export default configureStore({
  reducer: { 
    id : id.reducer
  }
}) 