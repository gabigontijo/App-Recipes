import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/RenderWithRouter';
import App from '../App';

describe('Should test recipes screen', () => {
  test('1)Should recipes be on screen at /meals', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });

    const recipes = await screen.findAllByAltText('imagem do meal');
    expect(recipes.length).toBe(12);
  });
  test('2)Should recipes be on screen at /drinks', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/drinks');
    });

    const recipes = await screen.findAllByAltText('imagem do drink');
    expect(recipes.length).toBe(12);
  });
});
