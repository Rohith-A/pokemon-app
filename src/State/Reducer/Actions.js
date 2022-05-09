export const getPokemons = (payload) => ({
        type: 'GET_POKEMON_LIST',
        payload
});
export const getPokemonDetails = (payload) => ({
        type: 'GET_POKEMON_DETAIL',
        payload
});
