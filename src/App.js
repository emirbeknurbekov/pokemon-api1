import React from "react";
import PokemonList from "./pages/PokemonList";

const App = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Список Покемонов</h1>
      <PokemonList />
    </div>
  );
};

export default App;
