import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import loginReducer from './components/login/loginSlice';
import parkingReducer from './components/parking-lot/parkingSlice';
import bookingReducer from './components/parking/bookingSlice';
import searchReducer from './components/FindBookingForm/findSlice';

const rootReducer = combineReducers({
  login: loginReducer,
  park: parkingReducer,
  book: bookingReducer,
  find: searchReducer,
});

export default configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
