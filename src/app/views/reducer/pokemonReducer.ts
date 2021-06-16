import { LIST_POKEMON } from '../actions/pokemonAction';

interface Action {
    type:string,
    payload:null
}

interface ListPokemon {
    listPokemon:{name:string, url:string}[]
}

const pokemonState = { listPokemon:[] as ListPokemon[] }


export const PokemonReducer = (state = pokemonState, action:Action) => {
    switch (action.type) {
      case LIST_POKEMON:   
        return { listPokemon: action.payload };
      default:
        return state;
    }
};