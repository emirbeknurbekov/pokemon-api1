import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPokemons, fetchPokemonDetails } from '../../services/api';

export const getPokemons = createAsyncThunk(
    'pokemon/getPokemons',
    async () => {
        const response = await fetchPokemons();
        return response;
    }
);


export const getPokemonByName = createAsyncThunk(
    'pokemon/getPokemonByName',
    async (name) => {
        const response = await fetchPokemonDetails(name);
        return response;
    }
);

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        list: [],
        selectedPokemon: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearSelectedPokemon: (state) => {
            state.selectedPokemon = null;
        }
    },
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
            })
            .addCase(getPokemonByName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPokemonByName.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedPokemon = action.payload;
            })
            .addCase(getPokemonByName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearSelectedPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
