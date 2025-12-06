import React from "react";
import { Link } from "react-router-dom";

const PokemonCard = ({ name, image }) => {
  return (
    <Link to={`/pokemon/${name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "10px",
          width: "150px",
          textAlign: "center",
          boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
          cursor: "pointer"
        }}
      >
        <img src={image} alt={name} style={{ width: "100px" }} />
        <h3 style={{ textTransform: "capitalize" }}>{name}</h3>
      </div>
    </Link>
  );
};

export default PokemonCard;
