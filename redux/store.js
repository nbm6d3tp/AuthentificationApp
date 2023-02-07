import { configureStore } from '@reduxjs/toolkit'
import authentificationSlice from './authentificationSlice'

export default configureStore({
  reducer: {
    authentification: authentificationSlice
  }
})