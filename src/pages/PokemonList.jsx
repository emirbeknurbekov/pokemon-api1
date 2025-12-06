import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "./PokemonCard";
import { getPokemons } from "../store/slices/pokemonSlice";

const PokemonList = () => {
  const dispatch = useDispatch();
  const { list: pokemons, loading } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(getPokemons({ limit: 20 }));
  }, [dispatch]);

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
