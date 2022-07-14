
async function apiPokemon(API) {
    let response = await fetch(API);
    let data = await response.json();

    return data;
}

export { apiPokemon }