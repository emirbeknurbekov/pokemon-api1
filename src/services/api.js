import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemons = async () => {
  try {
    const response = await axios.get(`${BASE_URL}?limit=10000&offset=0`);
    return response.data.results;
  } catch (error) {
    console.error("Ошибка загрузки покемонов:", error);
    return [];
  }
};

export const fetchPokemonDetails = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/${name}`);
    return {
      name: response.data.name,
      image: response.data.sprites.front_default,
      stats: response.data.stats,
      types: response.data.types,
    };
  } catch (error) {
    console.error("Ошибка загрузки деталей покемона:", error);
    throw error;
  }
};
