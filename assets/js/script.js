const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 1000
const limit = 15
let offset = 0;

class Pokemon {
    number;
    name;
    type;
    types = [];
    photo;
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

               <a href ="pag-poke.html"> <img src="${pokemon.photo}"
                     alt="${pokemon.name}"> </a>
            </div>
        </li>
    `
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)


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
            loadPokemonItens(offset, newLimit);
        } else {
            loadPokemonItens(offset, limit);
        }
    }
});