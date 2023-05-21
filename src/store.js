import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import loginReducer from './components/login/loginSlice';
import parkingReducer from './components/parking-lot/parkingSlice';
import bookingReducer from './components/parking/bookingSlice';

const rootReducer = combineReducers({
  login: loginReducer,
  park: parkingReducer,
  book: bookingReducer,
});

export default configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
