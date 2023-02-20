import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/RenderWithRouter';
import App from '../App';

describe('test Meals', () => {
  test('1) test Meals Filters', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/meals');
    });
    const filter1 = await screen.findByTestId('Beef-category-filter');
    const filter2 = await screen.findByTestId('Breakfast-category-filter');
    const filter3 = await screen.findByTestId('Chicken-category-filter');
    const filter4 = await screen.findByTestId('Dessert-category-filter');
    const filter5 = await screen.findByTestId('Goat-category-filter');
    const filter6 = await screen.findByTestId('All-category-filter');

    expect(filter1 && filter2 && filter3 && filter4
        && filter5 && filter6)
      .toBeInTheDocument();

    userEvent.click(filter1);
    expect(await screen.findByText('Beef and Mustard Pie')).toBeInTheDocument();

    userEvent.click(filter1);
    expect(await screen.findByText('Kumpir')).toBeInTheDocument();

    userEvent.click(filter2);
    expect(await screen.findByText('Breakfast Potatoes')).toBeInTheDocument();

    userEvent.click(filter3);
    expect(await screen.findByText('Brown Stew Chicken')).toBeInTheDocument();

    userEvent.click(filter4);
    expect(await screen.findByText('Banana Pancakes')).toBeInTheDocument();

    userEvent.click(filter5);
    expect(await screen.findByText('Mbuzi Choma (Roasted Goat)')).toBeInTheDocument();

    userEvent.click(filter6);
    expect(await screen.findByText('Kumpir')).toBeInTheDocument();
  });
});
