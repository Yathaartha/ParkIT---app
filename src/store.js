import {configureStore, combineReducers} from '@reduxjs/toolkit';
import loginReducer from './components/login/loginSlice';
import parkingReducer from './components/parking-lot/parkingSlice';

const rootReducer = combineReducers({
  login: loginReducer,
  park: parkingReducer,
});

export default configureStore({
  reducer: rootReducer,
});
