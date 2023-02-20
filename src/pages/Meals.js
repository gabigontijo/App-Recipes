import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from './Recipes';
import { requestMealBySelectedFilter,
  requestMealFilters, requestMeals } from '../service/RequestAPI';

export default function Meals() {
  const TWELVE = 12;
  const FIVE = 5;

  const { setTitle, requestMeal, setRecipesData,
    filters, setFilters, setRequestMeal,
    setFilterToggle, filterToggle } = useContext(ContextRecipes);

  const submitFilter = ({ target }) => {
    if (target.className === '') {
      target.className = 'click';
      requestMealBySelectedFilter(target.value)
        .then((meal) => setRequestMeal(meal.meals));
      setFilterToggle(false);
    } else {
      target.className = '';
      requestMealBySelectedFilter(target.value)
        .then((meal) => setRequestMeal(meal.meals));
      setFilterToggle(true);
    }
  };

  useEffect(() => {
    setTitle('Meals');
    requestMealFilters().then((filter) => setFilters(filter.meals));
    requestMeals().then((meal) => setRecipesData(meal.meals));
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
                type="button"
                value={ category.strCategory }
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ submitFilter }
                className=""
              >
                {category.strCategory}
              </button>))
          }
          <button
            type="button"
            data-testid="All-category-filter"
            className=""
            onClick={ () => {
              setRequestMeal([]);
            } }
          >
            All

          </button>
        </div>
        {(requestMeal.length >= 1 && !filterToggle)
          ? requestMeal.slice(0, TWELVE).map((meal, index) => (
            <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
              <NavLink to={ `/meals/${meal.idMeal}` }>
                <img
                  src={ meal.strMealThumb }
                  alt="imagem do meal"
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
              </NavLink>
            </div>
          )) : <Recipes />}
      </div>
      <Footer />
    </div>

  );
}
