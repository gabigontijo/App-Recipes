import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/RenderWithRouter';

const favoriteDrink = [{
  id: '178319',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: 'Aquamarine',
  image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
}];

const doneDrink = [
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

const doneDrink2 = [
  {
    id: '17837',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Alcoholic',
    name: 'Adam',
    image: 'https://www.thecocktaildb.com/images/media/drink/v0at4i1582478473.jpg',
    doneDate: '23/06/2020',
    tags: ['Alcoholic', 'Holiday'],
  },
];

describe('test DrinkInprogress', () => {
  test('1) API was call and elements should be in page', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    act(() => {
      history.push('/drinks/178319/in-progress');
    });

    const title = screen.getByTestId('recipe-title');
    const img = screen.getByTestId('recipe-photo');
    const ingredient1 = await screen.findAllByTestId('0-ingredient-step');
    const ingredient2 = await screen.findAllByTestId('1-ingredient-step');
    const ingredient3 = await screen.findAllByTestId('2-ingredient-step');
    const btnShare = screen.getByTestId('share-btn');
    const btnFavorite = screen.getByTestId('favorite-btn');
    const btnFinish = screen.getByTestId('finish-recipe-btn');

    expect(title && img && ingredient1 && ingredient2
        && ingredient3 && btnShare && btnFavorite
        && btnFinish).toBeInTheDocument();

    expect(btnFinish).toBeDisabled();
    expect(btnFavorite.src).toBe('http://localhost/whiteHeartIcon.svg');
    userEvent.click(ingredient1[0]);
    userEvent.click(ingredient2[0]);
    userEvent.click(ingredient3[0]);
    userEvent.click(btnFavorite);
    expect(btnFavorite.src).toBe('http://localhost/blackHeartIcon.svg');

    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual(favoriteDrink);

    userEvent.click(btnFavorite);
    expect(btnFavorite.src).toBe('http://localhost/whiteHeartIcon.svg');

    userEvent.click(btnFinish);
    expect(history.location.pathname).toBe('/done-recipes');
    expect(JSON.parse(localStorage.getItem('doneRecipes'))[0].tags).toEqual(doneDrink[0].tags);
  });

  test('2) btn share is copy link and test drink with tags !== null', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    localStorage.clear();

    act(() => {
      history.push('/drinks/17837/in-progress');
    });

    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: () => 'copy',
      },
    });

    const btnShare = screen.getByTestId('share-btn');
    userEvent.click(btnShare);
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
    userEvent.click(btnShare);
    expect(screen.queryByText('Link copied!')).not.toBeInTheDocument();
    const ingredient1 = await screen.findAllByTestId('0-ingredient-step');
    const ingredient2 = await screen.findAllByTestId('1-ingredient-step');
    const ingredient3 = await screen.findAllByTestId('2-ingredient-step');
    const btnFinish = screen.getByTestId('finish-recipe-btn');

    userEvent.click(ingredient1[0]);
    userEvent.click(ingredient2[0]);
    userEvent.click(ingredient3[0]);
    userEvent.click(btnFinish);

    expect(JSON.parse(localStorage.getItem('doneRecipes'))[0].tags).toEqual(doneDrink2[0].tags);
  });
});
