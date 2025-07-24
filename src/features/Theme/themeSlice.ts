import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ThemeMode = 'light' | 'dark';

type ThemeState = {
    mode: ThemeMode;
};

const getSystemTheme = (): ThemeMode => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
const storedTheme = localStorage.getItem('app-theme') as ThemeMode | null;

const initialState: ThemeState = {
    mode: storedTheme ?? getSystemTheme(),
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'dark' ? 'light' : 'dark';
            localStorage.setItem('app-theme', state.mode);
        },
        setTheme: (state, action: PayloadAction<ThemeMode>) => {
            state.mode = action.payload;
            localStorage.setItem('app-theme', action.payload);
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
