const axios = require('axios');

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';

async function getPokemonData(pokemonName) {
    try {
        const name = pokemonName.toLowerCase().trim();
        const response = await axios.get(`${POKEAPI_BASE}/pokemon/${name}`);
        
        const data = response.data;
        
        return {
            name: data.name,
            id: data.id,
            types: data.types.map(t => t.type.name),
            height: data.height / 10,
            weight: data.weight / 10,
            sprite: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
            stats: data.stats.reduce((acc, stat) => {
                acc[stat.stat.name] = stat.base_stat;
                return acc;
            }, {})
        };
    } catch (error) {
        console.error(`Erro ao buscar ${pokemonName}:`, error.message);
        return null;
    }
}

module.exports = {
    getPokemonData
};