const pokemonList = document.getElementById('pokemonPag')

const maxRecords = 151
const limit = 15

class Pokemon {
    number;
    name;
    type;
    types = [];
    photo2;
    lore;
}

let offset = 0;

function convertPokemonToPag(pokemon) {
    return `
    <div class = "content-pag ${pokemon.type}">
    <h1 class="name-poke">${pokemon.name}</h1>
    <div class="poke-photo">
        <img src="${pokemon.photo2}">
                    <div class="detail">
            <ol class="types pok-type">
            ${pokemon.types.map((type) => `<li class="pokemon type ${type}">${type}</li>`).join('')}
            </ol>
        </div>    
    </div>

    <div class="descri">
        <p>
            ${pokemon.lore}
        </p>
    </div>
    </div>
    `
}

function loadPokemonPag(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToPag).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonPag(offset, limit)

function isPageBottom() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight;
}

// Event listener para o evento de scroll
window.addEventListener('scroll', () => {
    // Verifique se o usuário chegou ao fim da página
    if (isPageBottom()) {
        offset += limit;
        const qtdRecordsWithNextPage = offset + limit;
        
        if (qtdRecordsWithNextPage >= maxRecords) {
            const newLimit = maxRecords - offset;
            loadPokemonPag(offset, newLimit);
        } else {
            loadPokemonPag(offset, limit);
        }
    }
});