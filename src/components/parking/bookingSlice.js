import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {baseApi} from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const bookParkingSlotAsync = createAsyncThunk(
  '/park/book',
  async ({vehicleNumber, estimatedHours}) => {
    try {
      const response = await baseApi.post('/park/book', {
        vehicleNumber,
        estimatedHours,
      });

      await AsyncStorage.setItem('booking', JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      return error;
    }
  },
);

export const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    booking: {},
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(bookParkingSlotAsync.fulfilled, (state, action) => {
      state.status = 'completed';
      state.booking = action.payload;
    });
    builder.addCase(bookParkingSlotAsync.rejected, (state, action) => {
      state.status = 'idle';
      state.booking = action.payload;
    });
  },
});

export default bookingSlice.reducer;
