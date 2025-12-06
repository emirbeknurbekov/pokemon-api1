import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "./PokemonCard";
import { getPokemons } from "../store/slices/pokemonSlice";

const PokemonList = () => {
  const dispatch = useDispatch();
  const { list: pokemons, loading } = useSelector((state) => state.pokemon);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch strictly once
    dispatch(getPokemons());
  }, [dispatch]);

  // Derived state: Filtered list
  // Memoize to avoid refiltering on every render if not needed
  const filteredPokemons = useMemo(() => {
    if (!searchTerm) {
      return pokemons;
    }
    return pokemons.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pokemons, searchTerm]);

  // Limit displayed items for performance (virtualization "lite")
  const displayList = filteredPokemons.slice(0, 50);

  const getPokemonImage = (url) => {
    // url example: https://pokeapi.co/api/v2/pokemon/1/
    const id = url.split("/").filter(Boolean).pop();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };

  if (loading && pokemons.length === 0) return <h2>Загрузка базы покемонов...</h2>;

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Живой поиск покемона..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "400px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {displayList.length > 0 ? (
          displayList.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              image={getPokemonImage(pokemon.url)}
            />
          ))
        ) : (
          <h2>Покемоны не найдены</h2>
        )}
      </div>
      {filteredPokemons.length > 50 && (
        <p style={{ marginTop: "20px", color: "#666" }}>
          Показано 50 из {filteredPokemons.length}. Уточните поиск.
        </p>
      )}
    </div>
  );
};

export default PokemonList;
