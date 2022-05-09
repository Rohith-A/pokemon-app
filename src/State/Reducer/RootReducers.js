import initialState from './InitialState'

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_POKEMON_LIST':
      return {
        ...state,
        pokemons: action.payload,
      };
    case 'GET_POKEMON_DETAIL':
      return {
        ...state,
        pokemonDetails: action.payload,
      };
    case 'SAVE_PAGINATION_FILTER':
      return {
        ...state,
        filterPagination: action.payload,
      };
    default:
      return state;
  }
};