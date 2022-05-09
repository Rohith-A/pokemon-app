import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { rootReducer } from '../../../State/Reducer/RootReducers';
import PokemonList from '../PokemonList';
import "@testing-library/jest-dom/extend-expect"


test('renders learn react link', () => {
    const store = createStore(rootReducer)

    render(<Provider store={store}>
        <BrowserRouter>
            <PokemonList />
        </BrowserRouter>
    </Provider>);
    const dropDown = screen.getByTestId('dropDOwn')
    expect(dropDown).toBeInTheDocument();
    expect(dropDown).toHaveTextContent(20);
    fireEvent.select(dropDown);
    expect(dropDown).toHaveTextContent(20);
});