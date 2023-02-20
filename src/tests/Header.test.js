import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/RenderWithRouter';
import App from '../App';

const PAGE_TITLE = 'page-title';

describe('should elements be on header', () => {
  test('1)', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });

    const profileButton = screen.getByTestId('profile-top-btn');
    const searchButton = screen.getByTestId('search-top-btn');
    const mealsTitle = screen.getByTestId(PAGE_TITLE);
    expect(mealsTitle).toHaveTextContent('Meals');
    expect(profileButton && searchButton && mealsTitle).toBeInTheDocument();

    userEvent.click(searchButton);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();

    userEvent.click(profileButton);

    const profileTitle = screen.getByTestId(PAGE_TITLE);

    expect(searchButton).not.toBeInTheDocument();
    expect(profileTitle).toHaveTextContent('Profile');

    act(() => {
      history.push('/done-recipes');
    });
    const doneRecipesTitle = screen.getByTestId(PAGE_TITLE);

    expect(searchButton).not.toBeInTheDocument();
    expect(doneRecipesTitle).toHaveTextContent('Done Recipes');

    act(() => {
      history.push('/favorite-recipes');
    });

    const favoriteRecipesTitle = screen.getByTestId(PAGE_TITLE);

    expect(favoriteRecipesTitle).toHaveTextContent('Recipes');
  });
});
