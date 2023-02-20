import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/RenderWithRouter';

const DoneRecipes = [{
  id: '52977',
  nationality: 'Turkish',
  name: 'Corba',
  category: 'Side',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  tags: ['Soup'],
  alcoholicOrNot: '',
  type: 'meal',
  doneDate: '2022-12-04T03:21:06.687Z' },
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

const pageDoneRecipes = '/done-recipes';
describe('testa se a página de Receitas Feitas no componente DoneRecipes', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    localStorage.setItem('doneRecipes', JSON.stringify(DoneRecipes));
  });
  afterEach(() => { jest.resetAllMocks(); });
  it('testa o Botao de compartilhar', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push(pageDoneRecipes); });
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: () => 'copy',
      },
    });
    const bntFilterMeal = screen.getByTestId('0-horizontal-share-btn');
    expect(bntFilterMeal).toBeInTheDocument();
    userEvent.click(bntFilterMeal);

    await new Promise((r) => { setTimeout(r, 1000); });
    jest.clearAllMocks();
  });
  it('verifica se o componente renderiza os buttons', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push(pageDoneRecipes); });
    const bntAll = screen.getByTestId('filter-by-all-btn');
    const bntMeal = screen.getByTestId('filter-by-meal-btn');
    const bntDrinks = screen.getByTestId('filter-by-drink-btn');

    expect(bntAll).toBeInTheDocument();
    expect(bntMeal).toBeInTheDocument();
    expect(bntDrinks).toBeInTheDocument();
  });

  it('verifica o funcionamento ao clicar na imagem do drink', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push(pageDoneRecipes); });

    const inputName = screen.getByTestId('1-horizontal-image');
    expect(inputName).toBeInTheDocument();
    userEvent.click(inputName);

    await new Promise((r) => { setTimeout(r, 1000); });
    jest.clearAllMocks();
  });
  it('verifica o funcionamento ao clicar na imagem da Meal', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push(pageDoneRecipes); });

    const inputName1 = screen.getByTestId('0-horizontal-image');
    expect(inputName1).toBeInTheDocument();
    userEvent.click(inputName1);

    await new Promise((r) => { setTimeout(r, 1000); });
    jest.clearAllMocks();
  });

  it('testa o filtro meals', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push(pageDoneRecipes); });

    const bntFilterMeal = screen.getByTestId('filter-by-meal-btn');
    expect(bntFilterMeal).toBeInTheDocument();

    userEvent.click(bntFilterMeal);
    await new Promise((r) => { setTimeout(r, 1000); });
    jest.clearAllMocks();
  });

  it('testa o filtro Drinks', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push(pageDoneRecipes); });

    const bntFilterDrink = screen.getByTestId('filter-by-drink-btn');
    expect(bntFilterDrink).toBeInTheDocument();

    userEvent.click(bntFilterDrink);
    await new Promise((r) => { setTimeout(r, 1000); });
    jest.clearAllMocks();
  });
});

describe('Testa LocalStorage vazio', () => {
  it('LocalStorage vazio', () => {
    localStorage.clear();
    const { history } = renderWithRouter(<App />);
    act(() => { history.push(pageDoneRecipes); });

    const bntFilterMeal = screen.getByTestId('filter-by-all-btn');
    expect(bntFilterMeal).toBeInTheDocument();

    userEvent.click(bntFilterMeal);

    jest.clearAllMocks();
  });
});
