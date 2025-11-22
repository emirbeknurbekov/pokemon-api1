import React from "react";

const PokemonCard = ({ name, image }) => {
  return (
    <div
      style={{
        backgroundColor: "aquamarine",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "10px",
        width: "150px",
        textAlign: "center",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <img src={image} alt={name} style={{ width: "100px" }} />
      <h3 style={{ textTransform: "capitalize" }}>{name}</h3>
    </div>
  );
};

export default PokemonCard;
