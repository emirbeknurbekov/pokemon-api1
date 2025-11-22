const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemons = async (limit = 20, offset = 0) => {
  try {
    const response = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);
    const data = await response.json();

    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const details = await res.json();
      return {
        name: pokemon.name,
        image: details.sprites.front_default,
      };
    });

    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error("Ошибка загрузки покемонов:", error);
    return [];
  }
};
