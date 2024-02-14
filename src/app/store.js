import { configureStore } from '@reduxjs/toolkit'
import CRUDOPRATION from '../features/crudSlice'
import Authentication from '../features/LoginSlice'
import FeeStatus from '../features/StdfeeSlice'
export const store = configureStore({
  reducer: {
    crud: CRUDOPRATION,
    Auth: Authentication,
    fees: FeeStatus
  },
})