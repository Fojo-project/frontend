import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id?: string;
  full_name?: string;
  email?: string;
  provider?: string;
  role?: string;
  avatar?: string;
}
interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload.id;
    },
  },
});

export const { setUser } = profileSlice.actions;
export default profileSlice.reducer;
