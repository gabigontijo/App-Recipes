import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/RenderWithRouter';

const favoriteMeal = [{
  id: '52771',
  type: 'meal',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
}];

const doneMeal = [
  {
    id: '52771',
    nationality: 'Italian',
    name: 'Spicy Arrabiata Penne',
    category: 'Vegetarian',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    tags: [
      'Pasta',
      'Curry',
    ],
    alcoholicOrNot: '',
    type: 'meal',
    doneDate: '23/06/2020',
  },
];

const doneMeal2 = [
  {
    id: '52971',
    type: 'meal',
    nationality: 'Tunisian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Kafteji',
    image: 'https://www.themealdb.com/images/media/meals/1bsv1q1560459826.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

describe('test DrinkInprogress', () => {
  test('1) API was call and elements should be in page', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    act(() => {
      history.push('/meals/52771/in-progress');
    });

    const title = screen.getByTestId('recipe-title');
    const img = screen.getByTestId('recipe-photo');
    const ingredient1 = await screen.findAllByTestId('0-ingredient-step');
    const ingredient2 = await screen.findAllByTestId('1-ingredient-step');
    const ingredient3 = await screen.findAllByTestId('2-ingredient-step');
    const ingredient4 = await screen.findAllByTestId('3-ingredient-step');
    const ingredient5 = await screen.findAllByTestId('4-ingredient-step');
    const ingredient6 = await screen.findAllByTestId('5-ingredient-step');
    const ingredient7 = await screen.findAllByTestId('6-ingredient-step');
    const ingredient8 = await screen.findAllByTestId('7-ingredient-step');
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
    userEvent.click(ingredient4[0]);
    userEvent.click(ingredient5[0]);
    userEvent.click(ingredient6[0]);
    userEvent.click(ingredient7[0]);
    userEvent.click(ingredient8[0]);
    userEvent.click(btnFavorite);
    expect(btnFavorite.src).toBe('http://localhost/blackHeartIcon.svg');

    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual(favoriteMeal);

    userEvent.click(btnFavorite);
    expect(btnFavorite.src).toBe('http://localhost/whiteHeartIcon.svg');

    userEvent.click(btnFinish);
    expect(history.location.pathname).toBe('/done-recipes');
    expect(JSON.parse(localStorage.getItem('doneRecipes'))[0].tags).toEqual(doneMeal[0].tags);
  });

  test('2) btn share is copy link and test drink with tags !== null', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    localStorage.clear();

    act(() => {
      history.push('/meals/52971/in-progress');
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
    const ingredient4 = await screen.findAllByTestId('3-ingredient-step');
    const ingredient5 = await screen.findAllByTestId('4-ingredient-step');
    const ingredient6 = await screen.findAllByTestId('5-ingredient-step');
    const ingredient7 = await screen.findAllByTestId('6-ingredient-step');
    const ingredient8 = await screen.findAllByTestId('7-ingredient-step');
    const ingredient9 = await screen.findAllByTestId('8-ingredient-step');

    const btnFinish = screen.getByTestId('finish-recipe-btn');

    userEvent.click(ingredient1[0]);
    userEvent.click(ingredient2[0]);
    userEvent.click(ingredient3[0]);
    userEvent.click(ingredient4[0]);
    userEvent.click(ingredient5[0]);
    userEvent.click(ingredient6[0]);
    userEvent.click(ingredient7[0]);
    userEvent.click(ingredient8[0]);
    userEvent.click(ingredient9[0]);
    userEvent.click(btnFinish);

    expect(JSON.parse(localStorage.getItem('doneRecipes'))[0].tags).toEqual(doneMeal2[0].tags);
  });
});
