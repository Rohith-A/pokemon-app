import './App.css';
import { Provider } from 'react-redux'
import { rootReducer } from './State/Reducer/RootReducers';
import PokemonList from './Components/Pokemons/PokemonList';
import { createStore } from 'redux'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PokemonDetails from './Components/Pokemons/PokemonDetails';
import { Wrapper } from './StyledComponents/StyledComponents';

function App() {
  const store = createStore(rootReducer)

  return (
    <Wrapper>
      <Provider store={store}>
        <div className="App">
          <img src={require("./images/pokemon_logo.png")} height={50} width={200} alt="" className="img-responsive" />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PokemonList />} />
              <Route path="/:id" element={<PokemonDetails />} />
            </Routes>
          </BrowserRouter>
        </div>
      </Provider>
    </Wrapper>);
}

export default App;
