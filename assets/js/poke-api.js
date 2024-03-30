const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail, speciesDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.showdown.front_default

    pokemon.photo2 = pokeDetail.sprites.other.dream_world.front_default

    const flavorTextEntries = speciesDetail.flavor_text_entries;
    const flavorText = flavorTextEntries.find(entry => entry.language.name === 'en'); // Filtrando para obter o flavor text em inglês
    if (flavorText) {
        pokemon.lore = flavorText.flavor_text;
    }

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then((pokemonDetail) => {
            const speciesUrl = pokemonDetail.species.url;
            return fetch(speciesUrl).then(response => response.json())
                .then((speciesDetail) => convertPokeApiDetailToPokemon(pokemonDetail, speciesDetail));
        });
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

