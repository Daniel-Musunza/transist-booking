import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import bookingService from './bookingService'

const myBooking = JSON.parse(localStorage.getItem('myBooking'))

const initialState = {
  bookings: [],
  myBooking: myBooking ? myBooking : null,
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
      return await bookingService.addbooking(bookingData);
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
export const searchMyBooking = createAsyncThunk('bookings/searchMyBooking', async (myBooking, thunkAPI) => {
  try {
    return await bookingService.searchMyBooking(myBooking)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
export const setMyBooking = createAsyncThunk(
  'bookings/setMyBooking',
  async (myBooking, thunkAPI) => {
    try {
      // You might want to save myBooking to localStorage here if needed
      localStorage.setItem('myBooking', JSON.stringify(myBooking));
      return myBooking;
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const confirmReceived = createAsyncThunk(
  'bookings/update',
  async (userData, thunkAPI) => {
    try {
      const { id } = userData;
      return await bookingService.confirmReceived(userData, id);
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
export const confirmNotReceived = createAsyncThunk(
  'bookings/update',
  async (userData, thunkAPI) => {
    try {
      const { id } = userData;
      return await bookingService.confirmNotReceived(userData, id);
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
      .addCase(searchMyBooking.pending, (state) => {
        state.isLoading = true
      })
      .addCase(searchMyBooking.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.myBooking = action.payload
      })
      .addCase(searchMyBooking.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.myBooking = null
      })
      .addCase(setMyBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myBooking = action.payload;
      })
      .addCase(setMyBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.myBooking = null;
      })
      .addCase(confirmReceived.pending, (state) => {
        state.isLoading = true
      })
      .addCase(confirmReceived.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.bookings = action.payload
      })
      .addCase(confirmReceived.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
     
  },
})

export const { reset } = bookingSlice.actions
export default bookingSlice.reducer
