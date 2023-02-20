import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/RenderWithRouter';
import App from '../App';

const btnSearchTop = 'search-top-btn';
const searchInput = 'search-input';
const Ingrediente = 'ingredient-search-radio';
const name = 'name-search-radio';
const btnSearch = 'exec-search-btn';

describe('should elements be on SearchBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('1) test SearchBar for meals', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });

    const searchIconButton = screen.getByTestId(btnSearchTop);
    userEvent.click(searchIconButton);
    const inputSearch = screen.getByTestId(searchInput);
    const radioIngredient = screen.getByTestId(Ingrediente);
    const radioName = screen.getByTestId(name);
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId(btnSearch);
    expect(inputSearch).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioFirstLetter).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    userEvent.type(inputSearch, 'potato');
    userEvent.click(radioIngredient);
    userEvent.click(searchButton);
    await waitFor(
      async () => {
        expect(history.location.pathname).toBe('/meals/52782');
      },
      { timeout: 2000 },
    );
  });
  test('2) test SearchBar for meals alerts', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });

    jest.spyOn(global, 'alert').mockImplementation(() => {});
    const searchIconButton = screen.getByTestId(btnSearchTop);
    userEvent.click(searchIconButton);
    const inputSearch = screen.getByTestId(searchInput);
    const radioIngredient = screen.getByTestId(Ingrediente);
    const searchButton = screen.getByTestId(btnSearch);

    userEvent.type(inputSearch, 'xablau');
    userEvent.click(radioIngredient);
    userEvent.click(searchButton);
    expect(radioIngredient.checked).toEqual(true);
    expect(inputSearch.value).toBe('xablau');
    await waitFor(
      async () => {
        expect(global.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
      },
      { timeout: 2000 },
    );
  });
  test('3) test SearchBar for drinks', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/drinks');
    });
    const searchIconButton = screen.getByTestId(btnSearchTop);
    userEvent.click(searchIconButton);
    const inputSearch = screen.getByTestId(searchInput);
    const radioName = screen.getByTestId(name);
    const radioIngredient = screen.getByTestId(Ingrediente);
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId(btnSearch);

    jest.spyOn(global, 'alert').mockImplementation(() => {});

    userEvent.type(inputSearch, 'wine');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    expect(radioFirstLetter.checked).toEqual(true);
    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');

    userEvent.clear(inputSearch);
    userEvent.type(inputSearch, 'wine');
    userEvent.click(radioIngredient);
    userEvent.click(searchButton);

    userEvent.clear(inputSearch);
    userEvent.type(inputSearch, 'Archbishop');
    userEvent.click(radioName);
    userEvent.click(searchButton);
    await waitFor(
      async () => {
        expect(history.location.pathname).toBe('/drinks/11052');
      },
      { timeout: 2000 },
    );
  });
  test('4) test SearchBar for drinks alerts', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/drinks');
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});
    const searchIconButton = screen.getByTestId(btnSearchTop);
    userEvent.click(searchIconButton);
    const inputSearch = screen.getByTestId(searchInput);
    const radioName = screen.getByTestId(name);
    const searchButton = screen.getByTestId(btnSearch);

    userEvent.type(inputSearch, 'xablau');
    userEvent.click(radioName);
    expect(radioName.checked).toEqual(true);
    expect(inputSearch.value).toBe('xablau');
    userEvent.click(searchButton);
    await waitFor(
      async () => {
        expect(global.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
      },
      { timeout: 2000 },
    );

    // expect(alertMock).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');

    // expect(global.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
  });
});
