import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import { fetchPokemons } from "../services/api";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchPokemons(20);
      setPokemons(data);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) return <h2>Загрузка покемонов...</h2>;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
      }}
    >
      {pokemons.map((pokemon, index) => (
        <PokemonCard key={index} name={pokemon.name} image={pokemon.image} />
      ))}
    </div>
  );
};

export default PokemonList;
