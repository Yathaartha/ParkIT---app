import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {baseApi} from '../../api/api';

export const loginAsync = createAsyncThunk(
  '/admin/login',
  async ({username, password}) => {
    try {
      const response = await baseApi.post('/admin/login', {
        username,
        password,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    status: 0,
    response: 'default',
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginAsync.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.response = action.payload;
    });
  },
});

export default loginSlice.reducer;
