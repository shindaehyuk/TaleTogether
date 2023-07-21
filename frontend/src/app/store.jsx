import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice';
import storageSession from 'redux-persist/es/storage/session';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const reducers = combineReducers({
  user: userSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});
