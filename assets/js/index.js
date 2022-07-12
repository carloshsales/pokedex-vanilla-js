import { apiPokemon } from "./api.js";
let baseUrl = 'https://pokeapi.co/api/v2/pokemon/';






let pokemonIndex = await apiPokemon(baseUrl);

// console.log(pokemonIndex.results);

for (let i = 0; i < pokemonIndex.results.length; i++) {

    let pokemonName = pokemonIndex.results[i].name;
    let pokemonSprites = await apiPokemon(`${baseUrl}${pokemonName}`);


    const container = document.querySelector('#container-wrapper');
    let cards = document.createElement('div');
    let cardsImage = document.createElement('img');
    let cardsTitle = document.createElement('h1');


    container.appendChild(cards);
    cards.appendChild(cardsImage);
    cards.appendChild(cardsTitle);

    cards.className = 'card';
    cardsImage.className = 'card-img';
    cardsTitle.className = 'card-title';

    cardsTitle.innerText = pokemonName;

    cardsImage.src = pokemonSprites.sprites['front_default']
}
