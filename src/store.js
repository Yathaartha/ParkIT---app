import {configureStore, combineReducers} from '@reduxjs/toolkit';
import loginReducer from './components/login/loginSlice';

const rootReducer = combineReducers({
  login: loginReducer,
});

export default configureStore({
  reducer: rootReducer,
});
