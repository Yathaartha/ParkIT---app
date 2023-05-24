import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {baseApi} from '../../api/api';

export const searchAsync = createAsyncThunk(
  '/park/search',
  async ({vehicleNumber}) => {
    try {
      const response = await baseApi.post('/park/search', {vehicleNumber});

      return response.data;
    } catch (error) {
      return error;
    }
  },
);

export const findSlice = createSlice({
  name: 'find',
  initialState: {
    findResponse: {},
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(searchAsync.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(searchAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.findResponse = action.payload;
    });
  },
});

export default findSlice.reducer;
