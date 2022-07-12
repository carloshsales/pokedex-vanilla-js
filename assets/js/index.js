import { apiPokemon } from "./api.js";

let baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
let pageUrl = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=50`;

let pokemonPage = await apiPokemon(pageUrl);

for (let i = 0; i < pokemonPage.results.length; i++) {

    let pokemonName = pokemonPage.results[i].name;
    let pokemonFeature = await apiPokemon(`${baseUrl}${pokemonName}`);

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

    console.log(pokemonFeature.sprites)

    cardsTitle.innerText = pokemonName;
    cardsImage.src = pokemonFeature.sprites['front_default'];

    pokemonFeature.types.forEach(element => {
        let cardType = document.createElement('span');

        const types = [
            'normal', 'fire', 'fighting',
            'water', 'flying', 'grass',
            'poison', 'electric', 'ground',
            'psychic', 'rock', 'ice',
            'bug', 'dragon', 'ghost',
            'dark', 'steel', 'fairy'
        ];

        cards.appendChild(cardType);
        cardType.className = 'card-type';

        cardType.innerText = element.type.name;
        cardType.classList.add('types-container');

        types.forEach(item => {
            if (item === cardType.textContent) {
                cardType.classList.add(`type-${item}`);
            }
        })
    });
}

function setType(content) {

}