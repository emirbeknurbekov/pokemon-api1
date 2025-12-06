import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  getPokemonByName,
  clearSelectedPokemon,
} from "../store/slices/pokemonSlice";

const PokemonDetail = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { selectedPokemon, loading, error } = useSelector(
    (state) => state.pokemon
  );

  useEffect(() => {
    dispatch(getPokemonByName(name));
    return () => {
      dispatch(clearSelectedPokemon());
    };
  }, [dispatch, name]);

  if (loading) return <h2>Загрузка информации...</h2>;
  if (error) return <h2>Ошибка: {error}</h2>;
  if (!selectedPokemon) return null;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "black",
          marginBottom: "20px",
          display: "inline-block",
        }}
      >
        ← Назад к списку
      </Link>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ textTransform: "capitalize" }}>{selectedPokemon.name}</h1>
        <img
          src={selectedPokemon.image}
          alt={selectedPokemon.name}
          style={{ width: "200px" }}
        />
        <h3>Типы:</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {selectedPokemon.types.map((typeInfo) => (
            <li
              key={typeInfo.type.name}
              style={{ textTransform: "capitalize" }}
            >
              {typeInfo.type.name}
            </li>
          ))}
        </ul>
        <h3>Характеристики:</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {selectedPokemon.stats.map((statInfo) => (
            <li
              key={statInfo.stat.name}
              style={{ textTransform: "capitalize" }}
            >
              {statInfo.stat.name}: {statInfo.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetail;
