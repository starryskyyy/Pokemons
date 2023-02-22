import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css";
import PokemonList from "./Pokemons";

export default function DisplayPokemons() {
    const [pokemons, setPokemons] = useState([]);
    const [nextUrl, setNextUrl] = useState("");

    // Getting pokemons from pokeapi
    useEffect(() => {
        const getPokemon = async () => {
            const res = await axios.get(
                "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
            );
            setNextUrl(res.data.next);
            await Promise.all(
                res.data.results.map(async (pokemon) => {
                    let pokeResponse = await axios.get(
                        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
                    );
                    setPokemons((p) => [...p, pokeResponse.data]);
                })
            );
        };
        getPokemon();
    }, []);

    // load more pokemons
    const LoadPokemon = async () => {
        const res = await axios.get(nextUrl);
        setNextUrl(res.data.next);
        await Promise.all(
            res.data.results.map(async (pokemon) => {
                let pokeResponse = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
                );
                setPokemons((p) => [...p, pokeResponse.data]);
            })
        );
    };
    return (
        <div className="App">
            <header>Pokemons </header>
            <div className="pokemon-container">
                {pokemons.map((pokemon) => {
                    return (
                        <div className="pokemon">
                            <PokemonList pokemon={pokemon} />
                        </div>
                    );
                })}
                <div className="btn" onClick={LoadPokemon}>
                    <button>view more</button>
                </div>
            </div>
        </div>
    );
}

