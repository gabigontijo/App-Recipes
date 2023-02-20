import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/RenderWithRouter';
import App from '../App';

describe('should elements be on RecipesInProgress', () => {
  test('1)/meals/id/in-progess elements', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals/52977/in-progress');
    });

    const imgMeal = screen.getByTestId('recipe-photo');
    const nameMeal = screen.getByTestId('recipe-title');
    const shareBtn = screen.getByTestId('share-btn');
    const faveBtn = screen.getByTestId('favorite-btn');
    const intructionMeal = screen.getByTestId('instructions');
    const finalizarBtn = screen.getByTestId('finish-recipe-btn');
    expect(imgMeal && nameMeal && shareBtn && faveBtn
    && intructionMeal && finalizarBtn).toBeInTheDocument();
  });
  test('2)/drinks/id/in-progess elements', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/drinks/15997/in-progress');
    });

    const imgDrink = screen.getByTestId('recipe-photo');
    const nameDrink = screen.getByTestId('recipe-title');
    const shareBtn = screen.getByTestId('share-btn');
    const faveBtn = screen.getByTestId('favorite-btn');
    const intructionDrink = screen.getByTestId('instructions');
    const finalizarBtn = screen.getByTestId('finish-recipe-btn');
    expect(imgDrink
    && nameDrink && shareBtn && faveBtn
    && intructionDrink && finalizarBtn).toBeInTheDocument();

    userEvent.click(faveBtn);
  });
  test('4) tests if the button sends to drinks recipe progress', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/drinks/15997/');
    });
    const startButton = screen.getByRole('button', { name: /continue recipe/i });
    expect(startButton).toBeInTheDocument();
    userEvent.click(startButton);
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
  });
  test('4) tests if the button sends to meals recipe progress', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals/52977');
    });
    const startButton = screen.getByRole('button', { name: /continue recipe/i });
    expect(startButton).toBeInTheDocument();
    userEvent.click(startButton);
    expect(history.location.pathname).toBe('/meals/52977/in-progress');
  });
});
