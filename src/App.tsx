import { connect } from "react-redux"
import { PokemonService } from './app/services/PokemonService';
import { useEffect } from 'react';
import { apiPokemon } from './app/api/apiPokemon';

interface Pokemon{
  name:string,
  url:string
}

function App({apiPokemon, state}:any) {

  useEffect(() => {
    (async function (){
      const response = await PokemonService.service.getPokemons()
    console.log(response)
    apiPokemon(response['results'])    
    })();   
  },[apiPokemon]) 

  
  return (
    <div className="container">
       <div className="row">
         <div className="col-md-8">
               <div className="row">
                 {state.listPokemon.map((item:Pokemon, i:number) => (
                  <div className="col-md-4" key={i}>
                     <div className="card">
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split("/")[6]}.png`} alt={item.name}/>
                     </div>
                  </div>
                      ))  }
               </div>
         </div>
         
         <div className="col-md-4">
              
         </div>

       </div>
       
    </div>
  );
}



const mapStateToProps = (state:any) => {
  return {
    state: state.PokemonReducer as any[]
   };
};

const mapDispatchToProps = {
  apiPokemon
};



export default connect(mapStateToProps, mapDispatchToProps)(App);
