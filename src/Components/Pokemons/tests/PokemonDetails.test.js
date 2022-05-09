import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { rootReducer } from '../../../State/Reducer/RootReducers';
import PokemonDetails from '../PokemonDetails';
import "@testing-library/jest-dom/extend-expect"


test('renders learn react link', () => {
    const store = createStore(rootReducer)

    render(<Provider store={store}>
        <BrowserRouter>
            <PokemonDetails />
        </BrowserRouter>
    </Provider>);
    const card = screen.getByTestId('card')
    expect(card).toBeInTheDocument();
});