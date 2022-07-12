
async function apiPokemon(API) {
    let response = await fetch(API);
    let dataPoke = await response.json();

    return dataPoke;
}

export { apiPokemon }