import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import { requestDrinkByFirstLetter, requestDrinkByIngredient,
  requestDrinkByName, requestMealByFirstLetter, requestMealByIngredient,
  requestMealByName } from '../service/RequestAPI';

export default function SearchBar() {
  const history = useHistory();
  const [searchRadio, setSearchRadio] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { requestMeal,
    setRequestMeal, requestDrink, setRequestDrink,
    setFilterToggle, filterToggle,
  } = useContext(ContextRecipes);

  const requestMealFunctions = {
    ingredient: requestMealByIngredient,
    name: requestMealByName,
    firstLetter: requestMealByFirstLetter,
  };

  const requestDrinksFunctions = {
    ingredient: requestDrinkByIngredient,
    name: requestDrinkByName,
    firstLetter: requestDrinkByFirstLetter,
  };
  const location = useLocation();
  const alertNotFound = 'Sorry, we haven\'t found any recipes for these filters.';
  const handleRadio = ({ target }) => {
    setSearchRadio(target.value);
  };

  useEffect(() => {
    if (requestMeal.length === 1) {
      history.push(`/meals/${requestMeal[0].idMeal}`);
    }
    if (requestDrink.length === 1) {
      history.push(`/drinks/${requestDrink[0].idDrink}`);
    }
  }, [requestDrink, requestMeal, history]);

  const handleBtnBuscar = () => {
    if (searchRadio === 'firstLetter' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    if (location.pathname === '/meals') {
      requestMealFunctions[searchRadio](searchInput)
        .then((r) => {
          if (r.meals === null) {
            global.alert(alertNotFound);
            return;
          }
          setRequestMeal(r.meals);
        });
    }
    if (location.pathname === '/drinks') {
      requestDrinksFunctions[searchRadio](searchInput)
        .then((r) => {
          if (r.drinks === null) {
            global.alert(alertNotFound);
            return;
          }
          setRequestDrink(r.drinks);
        });
      // .catch(() => {
      //   global.alert(alertNotFound);
      // });
    }
    setFilterToggle(!filterToggle);
  };

  return (
    <div className="search">
      <div className="search_background">
        <div className="search_div_Input">
          <label htmlFor="search">
            <input
              className="search_input"
              type="text"
              name="search"
              id="search"
              data-testid="search-input"
              placeholder="Search"
              value={ searchInput }
              onChange={ ({ target }) => { setSearchInput(target.value); } }
            />
          </label>
        </div>
        <div className="search_container_radio">
          <div className="search_div_radio">
            <label htmlFor="ingredient">

              <input
                className="search_radio"
                type="radio"
                id="ingredient"
                value="ingredient"
                data-testid="ingredient-search-radio"
                checked={ searchRadio === 'ingredient' }
                onChange={ handleRadio }

              />
              {' '}
              Ingredient
            </label>
            <label htmlFor="name">

              <input
                className="search_radio"
                type="radio"
                id="name"
                value="name"
                data-testid="name-search-radio"
                checked={ searchRadio === 'name' }
                onChange={ handleRadio }
              />
              {' '}
              Name
            </label>
            <label htmlFor="first-letter">

              <input
                className="search_radio"
                type="radio"
                id="first-letter"
                value="firstLetter"
                data-testid="first-letter-search-radio"
                checked={ searchRadio === 'firstLetter' }
                onChange={ handleRadio }
              />
              {' '}
              First letter
            </label>
          </div>
          <button
            className="search_btn"
            data-testid="exec-search-btn"
            type="button"
            onClick={ handleBtnBuscar }
          >
            Search

          </button>
        </div>
      </div>
    </div>
  );
}
