import  _http from 'axios';

export class PokemonService{
   
    ulrbase = "https://pokeapi.co/api/v2"

    private static _instance: PokemonService;

    public static get service():PokemonService{
      if(!PokemonService._instance){
        PokemonService._instance = new PokemonService();
      }
     return PokemonService._instance;
    }
    
    public async getPokemons() {
		return  (await _http.get<any>(this.ulrbase+"/pokemon?limit=50")).data;
	}

  public async getPokemon(id:string) {
		return  (await _http.get<any>(this.ulrbase+`/pokemon/${id}`)).data;
	}


}