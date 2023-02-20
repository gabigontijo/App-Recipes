import React from 'react';
import { screen, act } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/RenderWithRouter';

const FavoriteRecipesMock = [{
  id: '52977',
  nationality: 'Turkish',
  name: 'Corba',
  category: 'Side',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  tags: ['Soup'],
  alcoholicOrNot: '',
  type: 'meal',
  doneDate: '2022-12-04T03:21:06.687Z' },
{
  id: '178319',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: 'Aquamarine',
  image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  doneDate: '23/06/2020',
  tags: [],
},
];
const FAVORITE_RECIPES_PAGE = '/favorite-recipes';

describe('should test favorite recipes page', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(FavoriteRecipesMock),
    });
  });
  afterEach(() => { jest.resetAllMocks(); });

  test('should buttons be on screen', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push(FAVORITE_RECIPES_PAGE); });
    const bntAll = screen.getByTestId('filter-by-all-btn');
    const bntMeal = screen.getByTestId('filter-by-meal-btn');
    const bntDrinks = screen.getByTestId('filter-by-drink-btn');

    expect(bntAll).toBeInTheDocument();
    expect(bntMeal).toBeInTheDocument();
    expect(bntDrinks).toBeInTheDocument();
  });
  // test('should favorite recipes be on screen', async () => {
  //   const { history } = renderWithRouter(<App />);
  //   act(() => { history.push('/favorite-recipes'); });
  //   expect(history.location.pathname).toBe(FAVORITE_RECIPES_PAGE);
  //   const recipeImages = await screen.getAllByAltText('recipe');
  //   expect(recipeImages).toBeInTheDocument();
  // });
});
