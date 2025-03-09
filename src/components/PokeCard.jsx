import React, { useEffect, useState } from "react";
import { getFullPokedexNumber, getPokedexNumber } from "../utilis";
import TypeCard from "./TypeCard";

const PokeCard = (props) => {
  const { selectedPokemon } = props;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { abilities, name, types, height, sprites, stats, moves } = data || {};
  const imgList = Object.keys(sprites || {}).filter((val) => {
    if (!sprites[val]) {
      return false;
    }
    if (['versions', 'other'].includes(val)) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    if (loading || !localStorage) {
      return;
    }

    let cache = {};
    if (localStorage.getItem("Pokedex")) {
      cache = JSON.parse(localStorage.getItem("Pokedex"));
    }

    if (selectedPokemon in cache) {
      setData(cache[selectedPokemon]);
    }

    async function fetchPokemonData() {
      setLoading(true);
      try {
        const baseURL = "https://pokeapi.co/api/v2/";
        const suffix = "pokemon/" + getPokedexNumber(selectedPokemon);
        const finalURL = baseURL + suffix;
        const respond = await fetch(finalURL);
        const pokemonData = await respond.json();
        setData(pokemonData);
        cache[selectedPokemon] = pokemonData;
        localStorage.setItem("Pokedex", JSON.stringify(cache));
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonData();
  }, [selectedPokemon]);

  if (loading || !data) {
    return (
      <div>
        <h4>Loading.....</h4>
      </div>
    );
  }
  return (
    <div className="poke-card">
      <div>
        <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
        <h2>{name}</h2>
      </div>
      <div className="type-container">
        {types.map((typeObj, typeIndex) => {
          return <TypeCard key={typeIndex} type={typeObj?.type?.name} />;
        })}
      </div>

      <img
        className="default-img"
        src={"/pokemon/" + getFullPokedexNumber(selectedPokemon) + ".png"}
        alt={`${name}-large-img`}
      />

      <div className="img-container">
        {imgList.map((spriteURL, spriteIndex) => {
          const imgURL = sprites[spriteURL];
          return <img key={spriteIndex} src={imgURL} alt={`${name}-img-${spriteURL}`} />;
        })}
      </div>

      <h3>Stats</h3>
      <div className="stats-card">
        {stats.map((statObj,statIndex) => {
          const {stat,base_stat} = statObj;
          return(
            <div key={statIndex}>
              <p>{stat?.name.replaceAll('-','')}</p>
              <h4>{base_stat}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokeCard;
