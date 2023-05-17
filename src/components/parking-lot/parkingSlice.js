import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {baseApi} from '../../api/api';

export const getParkingDetailsAsync = createAsyncThunk(
  '/park/current',
  async () => {
    try {
      const response = await baseApi.get('/park/current-parking');

      return response.data;
    } catch (error) {
      return error;
    }
  },
);

export const parkingSlice = createSlice({
  name: 'parking',
  initialState: {
    parking: {total: 0, available: 0, occupied: 0},
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getParkingDetailsAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.parking = action.payload;
    });
  },
});

export default parkingSlice.reducer;
