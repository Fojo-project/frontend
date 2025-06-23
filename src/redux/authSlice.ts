import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { removeAuthTokens } from '@/utils/auth';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

interface LoginPayload {
  user: User;
  token: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginPayload>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      removeAuthTokens();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
