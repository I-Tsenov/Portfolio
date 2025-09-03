import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@src/features/Theme/themeSlice';
import contactReducer from '@src/features/ContactForm/contactSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        contact: contactReducer,
    },
});

// Infer types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
