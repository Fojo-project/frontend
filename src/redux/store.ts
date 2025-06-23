import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { AuthApi } from './authApi';
import { DashboardApi } from './DashboardApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [DashboardApi.reducerPath]: DashboardApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware, DashboardApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
