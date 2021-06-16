import { LIST_POKEMON } from '../views/actions/pokemonAction';

export const apiPokemon = (listPokemon:any[]) => async (dispatch:any) =>{
    dispatch({
       type:LIST_POKEMON,
       payload:listPokemon
   })
}