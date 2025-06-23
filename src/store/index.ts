import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth.slice';
import { AuthApi } from './auth/auth.api';
import { DashboardApi } from './dashboard/dashboard.api';

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
