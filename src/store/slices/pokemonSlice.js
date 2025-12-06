import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPokemons } from '../../services/api';

export const getPokemons = createAsyncThunk(
    'pokemon/getPokemons',
    async ({ limit = 20, offset = 0 } = {}) => {
        const response = await fetchPokemons(limit, offset);
        return response;
    }
);

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPokemons.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPokemons.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(getPokemons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default pokemonSlice.reducer;
