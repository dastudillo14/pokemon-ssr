const TOTAL_POKEMONS = 80;
const TOTAL_PAGES = 25;
const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon';

(async () => {

    const fs = require('fs');

    const pokemonIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1); //Crea un array de TOTAL_POKEMONS elementos

    const pokemonPages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1); //Crea un array de TOTAL_PAGES elementos

    let fileContent = pokemonIds.map((id) => `/pokemons/${id}`).join('\n');

    fileContent += '\n' + pokemonPages.map((id) => `/pokemons/page/${id}`).join('\n');

    //Consulta TOTAL_POKEMONS del api para obtener results.
    const pokemonNameList = await fetch(`${POKEMON_API}?limit=${TOTAL_POKEMONS}`)
        .then(res => res.json())
        .then(({ results }) => {
            return results;
        });
    
    fileContent += '\n' + pokemonNameList.map((pokemon) => `/pokemons/page/${pokemon.name}`).join('\n'); //Crea un array de TOTAL_POKEMONS elementos para pages con name

    fs.writeFileSync('routes.txt', fileContent);

    console.log('routes.txt generado.');

})();