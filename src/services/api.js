import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemons = async (limit = 20, offset = 0) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: { limit, offset },
    });
    const results = response.data.results;

    const promises = results.map(async (pokemon) => {
      const res = await axios.get(pokemon.url);
      return {
        name: pokemon.name,
        image: res.data.sprites.front_default,
      };
    });

    return await Promise.all(promises);
  } catch (error) {
    console.error("Ошибка загрузки покемонов:", error);
    return [];
  }
};
