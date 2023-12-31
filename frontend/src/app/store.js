import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/auth/authSlice'
import bookingReducer from '../features/bookings/bookingSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    bookings: bookingReducer
  },
})
