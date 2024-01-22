import { configureStore } from '@reduxjs/toolkit'
import CRUDOPRATION from '../features/crudSlice'

export const store = configureStore({
  reducer: {
    crud: CRUDOPRATION
  },
})