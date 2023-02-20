import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/RenderWithRouter';
import App from '../App';

describe('test Drinks', () => {
  test('1) test Drinkd Filters', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/drinks');
    });
    const filter1 = await screen.findByTestId('Ordinary Drink-category-filter');
    const filter2 = await screen.findByTestId('Cocktail-category-filter');
    const filter3 = await screen.findByTestId('Shake-category-filter');
    const filter4 = await screen.findByTestId('Other / Unknown-category-filter');
    const filter5 = await screen.findByTestId('Cocoa-category-filter');
    const filter6 = await screen.findByTestId('All-category-filter');

    expect(filter1 && filter2 && filter3 && filter4
        && filter5 && filter6)
      .toBeInTheDocument();

    userEvent.click(filter1);
    expect(await screen.findByText('3-Mile Long Island Iced Tea')).toBeInTheDocument();

    userEvent.click(filter1);
    expect(await screen.findByText('GG')).toBeInTheDocument();

    userEvent.click(filter2);
    expect(await screen.findByText('155 Belmont')).toBeInTheDocument();

    userEvent.click(filter3);
    expect(await screen.findByText('151 Florida Bushwacker')).toBeInTheDocument();

    userEvent.click(filter4);
    expect(await screen.findByText('A Piece of Ass')).toBeInTheDocument();

    userEvent.click(filter5);
    expect(await screen.findByText('Castillian Hot Chocolate')).toBeInTheDocument();

    userEvent.click(filter6);
    expect(await screen.findByText('GG')).toBeInTheDocument();
  });
});
