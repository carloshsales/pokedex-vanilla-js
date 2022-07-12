async function apiPokemon(API) {
    let response = await fetch(API);
    let dataPoke = await response.json();

    return await dataPoke;
}

export { apiPokemon }