import { first151Pokemon, getFullPokedexNumber } from "../utilis";

export function SideNav() {
  return (
    <nav>
        <div className={"header"}>
            <h1 className="text-gradient">
                Pokedéx
            </h1>
        </div>
        <input/>
      {first151Pokemon.map((pokemon, pokemonIndex) => {
        return (
          <button className={"nav-card"}>
            <p>{getFullPokedexNumber(pokemonIndex)}</p>
            <p>{pokemon}</p>
          </button>
        );
      })}
    </nav>
  );
}
