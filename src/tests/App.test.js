import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../helpers/RenderWithRouter';

describe('', () => {
  test('should footer be on screen', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('./meals');
    });
    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    const mealsButton = screen.getByTestId('meals-bottom-btn');
    expect(drinksButton && mealsButton).toBeInTheDocument();
    userEvent.click(drinksButton);
    expect(history.location.pathname).toBe('/drinks');
  });
  test('should footer be on screen', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('./drinks');
    });
    const mealsButton = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsButton);
    expect(history.location.pathname).toBe('/meals');
  });
});
