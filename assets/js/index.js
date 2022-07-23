import { apiPokemon, pokemonFeatures, pokemonDescrition } from "./api.js";

const container = document.querySelector('#container-wrapper');
let offset = 0;
let urlPage = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`

let pokemonPage = await apiPokemon(urlPage);

const btnMore = document.createElement('button');
btnMore.className = 'show-more';

pages(pokemonPage);
showMore()

speciesDetails()

function modalDetails(mod, cards) {
    const cardModal = document.createElement('div');
    const nameModal = document.createElement('h1');
    const idModal = document.createElement('h1');
    const imgModal = document.createElement('img');
    const habitatModal = document.createElement('span');
    const pModal = document.createElement('p');


    mod.appendChild(cardModal);
    cardModal.appendChild(idModal);
    cardModal.appendChild(nameModal);
    cardModal.appendChild(imgModal);
    cardModal.appendChild(habitatModal);
    cardModal.appendChild(pModal);

    idModal.innerText = cards.querySelector('.card-id').textContent
    nameModal.innerText = cards.querySelector('.card-name').textContent
    imgModal.src = cards.querySelector('.card-img').src

    cardModal.className = 'card-modal';
    idModal.className = 'card-id';
    nameModal.className = 'card-name';
    imgModal.className = 'modal-img';
    pModal.className = 'modal-description';
    habitatModal.className = 'modal-habitat';

    let species = async () => {
        let newId = idModal.textContent.replace('ID: ', '')
        let data = await pokemonDescrition(newId);

        pModal.innerText = `" ${data.flavor_text_entries[9].flavor_text.replace('é', 'E')} "`;
        habitatModal.textContent = `HABITAT: ${data.habitat.name}`;
    }
    species()
}

function showAndHiddenModal() {
    const modal = document.querySelector('.modal');
    const allCards = document.querySelectorAll('.card');
    const closeModal = document.querySelector('.close-modal');

    allCards.forEach(card => {
        card.onclick = () => {
            modalDetails(modal, card);
            modal.style.visibility = 'visible';
        }
    })

    closeModal.addEventListener('click', () => {
        modal.style.visibility = 'hidden';
        document.querySelectorAll('.card-modal').forEach(card => {
            card.style.display = 'none';
        });
    });
}

function showMore(btn) {
    btn.onclick = async () => {
        let next = await apiPokemon(pokemonPage.next);
        pages(next)
        pokemonPage = next;
    }
}

function pages(page) {
    page.results.forEach(async item => {
        let name = item.name;
        let features = await pokemonFeatures(name);
        let index = features.id;
        let sprite = features.sprites['front_default'];
        let types = features.types;

        createCards(index, name, sprite, types);
    });
}

function createCards(pokemonIndex, pokemonName, pokemonSprite, pokemonTypes) {
    const cards = document.createElement('div');
    const cardsImage = document.createElement('img');
    const cardsTitle = document.createElement('h1');
    const cardsId = document.createElement('h1');

    container.appendChild(cards);
    cards.appendChild(cardsId);
    cards.appendChild(cardsImage);
    cards.appendChild(cardsTitle);

    cards.className = 'card';
    cardsImage.className = 'card-img';
    cardsTitle.className = 'card-name';
    cardsId.className = 'card-id';

    cardsId.innerText = `ID: ${pokemonIndex}`;
    cardsTitle.innerText = `${pokemonName}`;
    cardsImage.src = pokemonSprite;

    pokemonTypes.forEach(element => {
        let cardType = document.createElement('span');

        cards.appendChild(cardType);
        cardType.className = 'card-type';

        cardType.innerText = element.type.name;
        cardType.classList.add('types-container');

        const types = [
            'normal', 'fire', 'fighting',
            'water', 'flying', 'grass',
            'poison', 'electric', 'ground',
            'psychic', 'rock', 'ice',
            'bug', 'dragon', 'ghost',
            'dark', 'steel', 'fairy'
        ];

        types.forEach(item => {
            if (item === cardType.textContent) {
                cardType.classList.add(`type-${item}`);
            }
        });
    });

    container.appendChild(btnMore);
    btnMore.innerText = 'MORE'
    showMore(btnMore)

    showAndHiddenModal();
}



