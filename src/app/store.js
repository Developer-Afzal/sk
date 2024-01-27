import { configureStore } from '@reduxjs/toolkit'
import CRUDOPRATION from '../features/crudSlice'
import Authentication from '../features/LoginSlice'

export const store = configureStore({
  reducer: {
    crud: CRUDOPRATION,
    Auth: Authentication
  },
})