import { connect } from "react-redux"
import { PokemonService } from './app/services/PokemonService';
import { useEffect, useState } from 'react';
import { apiPokemon } from './app/api/apiPokemon';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Pokemon {
  name: string,
  url: string
}


function searchData<T>(data: Array<T>, toSearch: string):any[] {
  if (data.length === 0) return [];
  
  let filteredData: T[] = [];

  for (const key in data[0]) {
      filteredData.push(...data.filter(
        item => String(item[key]).toLowerCase().includes(toSearch.toLowerCase())))   
  }
  
  const noRepeat = new Set(filteredData);
  return Array.from(noRepeat);
}

function App({ apiPokemon, state }: any) {
  const [search, setSearch] = useState('');
  const [detail, setDetail] = useState({
    idPokemon: '',
    PokemonName: '',
    PokemonType: [],
    ability: [],
    url: 'https://data.pixiz.com/output/user/frame/preview/400x400/1/1/8/3/1713811_09879.jpg'
  });


  useEffect(() => {
    (async function () {
      const response = await PokemonService.service.getPokemons()
      console.log("dentro del useEffect ",response)
      apiPokemon(response['results'])
    })();
  }, [apiPokemon])


  async function viewDetailPokemon(idpokemon: string) {

    const response = await PokemonService.service.getPokemon(idpokemon);
    const { id, name, abilities, types, sprites } = response
    console.log("buscando por id: ",response)
    setDetail({
      idPokemon: id,
      PokemonName: name,
      ability: abilities,
      PokemonType: types,
      url: sprites.back_default
    })
  }

  function refresh() {}

  


  return (
    <div className="container pt-3">
        
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Pokemon Name" 
          onChange={(e) => setSearch( e.target.value)}
          name="search"
          value={search}
        />

      <div className="row">
        <div className="col-md-8">
          <InfiniteScroll
            dataLength={state.listPokemon.length}
            next={state.listPokemon}
            hasMore={true}
            initialScrollY={5}
            loader={<h4>..</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            height={580}
            refreshFunction={refresh}
            pullDownToRefresh
            pullDownToRefreshThreshold={10}
            pullDownToRefreshContent={
              <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
            }
            releaseToRefreshContent={
              <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
            }
          >
            <div className="row">
              { searchData(state.listPokemon, search).map((item: Pokemon, i: number) => (
                <div className="col-md-4" key={i}>
                  <div className="card" onClick={() => viewDetailPokemon(item.url.split("/")[6])}>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split("/")[6]}.png`} alt={item.name} />
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>

        <div className="col-md-4">
          <div className="card">
            <img 
             src={detail.url} width={90} height={230}
             className="card-img-top"
             alt="detalle"
           />
            <div className="card-body">
              <h5>id:{detail.idPokemon}</h5>
              <h5>Name:{detail.PokemonName}</h5>
              <h5>Type:{detail.PokemonType.map((item: any, i: number) => (
                <li key={i}>{item.type.name}</li>
              ))}</h5>
              <h5>Ability:{detail.ability.map((item: any, i: number) => (
                <li key={i}>{item.ability.name}</li>
              ))}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



const mapStateToProps = (state: any) => {
  return {
    state: state.PokemonReducer as any[]
  };
};

const mapDispatchToProps = {
  apiPokemon
};



export default connect(mapStateToProps, mapDispatchToProps)(App);
