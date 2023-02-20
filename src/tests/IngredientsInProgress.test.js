import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/RenderWithRouter';

const InprogressInit = {
  drinks: {},
  meals: {} };

const ingredTestId1 = '0-ingredient-step';
const ingredTestId3 = '2-ingredient-step';

describe('test RecipeInprogress', () => {
  test('1) test MealsInprogress inProgressRecipes localStorage', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    act(() => {
      history.push('/meals/52771/in-progress');
    });

    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toEqual(InprogressInit);

    const ingredient1 = await screen.findAllByTestId(ingredTestId1);
    const ingredient2 = await screen.findAllByTestId('1-ingredient-step');
    const ingredient3 = await screen.findAllByTestId(ingredTestId3);
    const btnFinish = screen.getByTestId('finish-recipe-btn');

    expect(btnFinish).toBeDisabled();
    expect(ingredient1[0].className).toBe('');
    userEvent.click(ingredient1[0]);
    expect(ingredient1[0].className).toBe('radio-ckecked');
    userEvent.click(ingredient2[0]);
    userEvent.click(ingredient3[0]);

    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toEqual({ meals:
        { 52771: [0, 1, 2] },
    drinks: {} });

    userEvent.click(ingredient3[0]);

    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toEqual({ meals:
        { 52771: [0, 1] },
    drinks: {} });

    act(() => {
      history.push('/drinks/17837/in-progress');
    });

    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toEqual({ meals: { 52771: [0, 1] }, drinks: {} });
    const ingredient = await screen.findAllByTestId(ingredTestId3);

    userEvent.click(ingredient[0]);

    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toEqual({ meals: { 52771: [0, 1] }, drinks: { 17837: [2] } });
  });

  test('2) test DrinksInprogress inProgressRecipes localStorage', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    localStorage.clear();
    act(() => {
      history.push('/drinks/17837/in-progress');
    });

    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toEqual(InprogressInit);

    const ingredient1 = await screen.findAllByTestId(ingredTestId1);
    const ingredient2 = await screen.findAllByTestId('1-ingredient-step');
    const ingredient3 = await screen.findAllByTestId('2-ingredient-step');
    const btnFinish = screen.getByTestId('finish-recipe-btn');

    expect(btnFinish).toBeDisabled();
    expect(ingredient1[0].className).toBe('');
    userEvent.click(ingredient1[0]);
    expect(ingredient1[0].className).toBe('radio-ckecked');
    userEvent.click(ingredient2[0]);
    userEvent.click(ingredient3[0]);

    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toEqual({ drinks:
        { 17837: [0, 1, 2] },
    meals: {} });

    userEvent.click(ingredient1[0]);

    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toEqual({ drinks:
        { 17837: [1, 2] },
    meals: {} });

    act(() => {
      history.push('/meals/52771/in-progress');
    });
    const ingredient = await screen.findAllByTestId(ingredTestId1);

    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toEqual({ drinks: { 17837: [1, 2] }, meals: {} });
    userEvent.click(ingredient[0]);

    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toEqual({ drinks: { 17837: [1, 2] }, meals: { 52771: [0] } });
  });
});
