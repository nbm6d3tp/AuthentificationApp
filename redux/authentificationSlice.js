import {createSlice} from '@reduxjs/toolkit';

export const authentificationSlice = createSlice({
  name: 'authentification',
  initialState: null,
  reducers: {
    setAuthentification: (state, action) => action.payload,
  },
});

export const {setAuthentification} = authentificationSlice.actions;
export const selectAuthentification = state => state.authentification;

export default authentificationSlice.reducer;
