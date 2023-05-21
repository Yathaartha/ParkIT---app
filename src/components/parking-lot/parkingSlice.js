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

export const getNearestSlotAsync = createAsyncThunk(
  '/park/nearest-slot',
  async () => {
    try {
      const response = await baseApi.get('/park/nearest-slot');

      return response.data.slot;
    } catch (error) {
      return error;
    }
  },
);

export const parkingSlice = createSlice({
  name: 'parking',
  initialState: {
    parking: {
      availableSlots: 68,
      slots: [],
    },
    nearestSlot: {
      id: null,
      laneNumber: 4,
      slotNumber: 1,
      isAvailable: true,
      distanceFromEntry: null,
    },
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getParkingDetailsAsync.pending, (state, action) => {
      state.status = 'idle';
      state.parking = {
        availableSlots: 68,
        slots: [],
      };
    });
    builder.addCase(getParkingDetailsAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.parking = action.payload;
    });
    builder.addCase(getParkingDetailsAsync.rejected, (state, action) => {
      state.status = 'idle';
      state.parking = {
        availableSlots: 68,
        slots: [],
      };
    });
    builder.addCase(getNearestSlotAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.nearestSlot = action.payload;
    });
  },
});

export default parkingSlice.reducer;
