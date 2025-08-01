import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type ContactFormData = {
    name: string;
    email: string;
    message: string;
};

type SendMessageResponse = {
    success: boolean;
};

const API_BASE = import.meta.env.VITE_API_BASE;

export const sendMessage = createAsyncThunk<SendMessageResponse, ContactFormData, { rejectValue: string }>(
    'contact/sendMessage',
    async (formData, thunkAPI) => {
        try {
            const res = await fetch(`${API_BASE}/contact/send-message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!res.ok) {
                const data = await res.json();
                return thunkAPI.rejectWithValue(data.error || 'Send failed');
            }
            return (await res.json()) as SendMessageResponse;
        } catch (err: unknown) {
            let message = 'Unknown error occurred';
            if (err instanceof Error) {
                message = err.message;
            }
            return thunkAPI.rejectWithValue(message);
        }
    }
);

type ContactState = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: ContactState = { status: 'idle', error: null };

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: { resetContactState: () => initialState },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(sendMessage.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ?? action.error.message ?? 'Unknown error';
            });
    },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;
