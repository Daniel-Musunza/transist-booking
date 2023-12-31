import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import bookingService from './bookingService'

const initialState = {
  bookings: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user bookings
export const getbookings = createAsyncThunk(
  'bookings/getAll',
  async (_, thunkAPI) => {
    try {
      return await bookingService.getbookings()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
);
export const addbooking = createAsyncThunk(
  'bookings/create',
  async (bookingData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingService.addbooking(bookingData,token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getbookings.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getbookings.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.bookings = action.payload
      })
      .addCase(getbookings.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(addbooking.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addbooking.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.bookings.push(action.payload)
      })
      .addCase(addbooking.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = bookingSlice.actions
export default bookingSlice.reducer
