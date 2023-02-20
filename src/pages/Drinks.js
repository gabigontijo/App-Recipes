import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { requestDrinkBySelectedFilter, requestDrinkFilters,
  requestDrinks } from '../service/RequestAPI';
import Recipes from './Recipes';

export default function Drinks() {
  const { setTitle, setRecipesData,
    requestDrink, setFilters, filters, setRequestDrink,
    setFilterToggle, filterToggle } = useContext(ContextRecipes);
  const TWELVE = 12;
  const FIVE = 5;

  const submitFilter = ({ target }) => {
    const listFilters = target.parentElement.children;
    for(let filter of listFilters) {
      filter.className = '';
    }
    target.className = 'filterSelected';
    if(target.value === 'All'){
      setRequestDrink([]);
    }else {
      requestDrinkBySelectedFilter(target.value)
      .then((drink) => setRequestDrink(drink.drinks));
    }
  };

  useEffect(() => {
    setTitle('Drinks');
    requestDrinkFilters().then((filter) => setFilters(filter.drinks));
    requestDrinks().then((drink) => {
      setRecipesData(drink.drinks);
    });
  }, [setTitle, setRecipesData, setFilters]);

  return (
    <div>
      <Header />
      <div>
        <div>
          {
            filters.length > 0
            && filters.slice(0, FIVE).map((category) => (
              <button
                key={ category.strCategory }
                value={ category.strCategory }
                type="button"
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ submitFilter }
              >
                {category.strCategory}
              </button>))
          }
          <button
            type="button"
            value="All"
            className="filterSelected"
            data-testid="All-category-filter"
            onClick={ submitFilter }
          >
            All

          </button>
        </div>
        {(requestDrink.length > 1)
          ? requestDrink.slice(0, TWELVE).map((drink, index) => (
            <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
              <NavLink to="/drinks">
                <img
                  src={ drink.strDrinkThumb }
                  alt="imagem do drink"
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
              </NavLink>
            </div>
          )) : <Recipes />}
      </div>
      <Footer />
    </div>
  );
}
