



const apiPokemon = async (API) => {
    const response = await fetch(API);
    const data = await response.json();

    return data;
}

const pokemonFeatures = async (name) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();

    return data;
}

const pokemonDescrition = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const data = await response.json();

    return data;
}

export { apiPokemon, pokemonFeatures, pokemonDescrition }