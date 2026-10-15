import { createSlice } from '@reduxjs/toolkit';

export interface User {
    id: string,
    name: string,
    email: string,
    role: string,
    password: string,
    permissions: string[]
}

export interface AuthState {
    user: User | null,
    token: string | null,
    isAuthenticated: boolean
}

function getStoredUser() {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
        return null;
    }

    try {
        return JSON.parse(storedUser);
    } catch {
        localStorage.removeItem("user");
        return null;
    }
}

const storedUser = getStoredUser();
const storedToken = localStorage.getItem("token");

const initialState: AuthState = {
    user: storedUser,
    token: storedToken,
    isAuthenticated: Boolean(
        storedUser && storedToken
    ),
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
        },
        updateUser: (state, action) => {
            if (!state.user) return;
            state.user = {
                ...state.user,...action.payload
            }
              localStorage.setItem("user", JSON.stringify(state.user));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    }
})

export const { loginSuccess, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;