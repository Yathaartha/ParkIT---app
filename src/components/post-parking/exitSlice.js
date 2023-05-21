import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {baseApi} from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const exitParkingSlotAsync = createAsyncThunk(
  '/park/exit',
  async ({vehicleNumber}) => {
    try {
      const response = await baseApi.post('/park/exit', {
        vehicleNumber,
      });

      await AsyncStorage.setItem('booking', JSON.stringify({}));

      return response.data;
    } catch (error) {
      return error;
    }
  },
);

export const exitSlice = createSlice({
  name: 'exitParking',
  initialState: {
    booking: {},
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(exitParkingSlotAsync.fulfilled, (state, action) => {
      state.status = 'completed';
      state.booking = action.payload;
    });
    builder.addCase(exitParkingSlotAsync.rejected, (state, action) => {
      state.status = 'idle';
      state.booking = action.payload;
    });
  },
});

export default exitParkingSlotAsync.reducer;
