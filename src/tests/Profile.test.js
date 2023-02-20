import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../helpers/RenderWithRouter';

describe('test page Profile', () => {
  test('verifica os testIds e clica no botão de receitas feitas', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    localStorage.setItem('user', '{"email":"nome@mail.com"}');
    act(() => {
      history.push('/profile');
    });

    const email = screen.getByTestId('profile-email');
    const doneButton = screen.getByTestId('profile-done-btn');
    const favoriteButton = screen.getByTestId('profile-favorite-btn');

    expect(email && doneButton && favoriteButton).toBeInTheDocument();

    userEvent.click(doneButton);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  test('testa o botão de receitas favoritas', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    localStorage.setItem('user', '{"email":"email@mail.com"}');
    act(() => {
      history.push('/profile');
    });
    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteButton);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  test('verifica o botão de logout', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    localStorage.setItem('user', '{"email":"email@mail.com"}');
    act(() => {
      history.push('/profile');
    });
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
  });
});
