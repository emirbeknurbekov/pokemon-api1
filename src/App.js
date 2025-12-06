import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonList from "./pages/PokemonList";
import PokemonDetail from "./pages/PokemonDetail";

const App = () => {
  return (
    <Router basename="/pokemon-api1">
      <div style={{ padding: "20px" }}>
        <h1>Список Покемонов</h1>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
