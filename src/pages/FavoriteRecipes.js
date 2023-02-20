import React, { useEffect, useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import drinkImage from '../images/drinkIcon.svg';
import mealImage from '../images/mealIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function FavoriteRecipes() {
  const { setTitle } = useContext(ContextRecipes);
  const [favorite, setFavorite] = useState([]);
  const [message, setMessage] = useState(false);
  // const history = useHistory();

  useEffect(() => {
    setTitle('Favorite Recipes');
  }, [setTitle]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse((localStorage.getItem('favoriteRecipes') || '[]'));
    setFavorite(favoriteRecipes);
  }, []);

  const changeSelectedType = (str) => {
    const favoriteRecipes = JSON.parse((localStorage.getItem('favoriteRecipes') || '[]'));
    const filteredFavoriteRecipes = favoriteRecipes.filter((el) => el.type.includes(str));
    setFavorite(filteredFavoriteRecipes);
  };

  const unfavoriteRecipe = (event) => {
    const { target: { value } } = event;
    const removeFavorite = favorite.filter((recipe) => recipe.id !== value);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
    setFavorite(removeFavorite);
  };
  return (

    <div>
      <Header />
      <section>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => changeSelectedType('') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => changeSelectedType('meal') }
        >
          <img
            src={ mealImage }
            data-testid="meals-bottom-btn"
            alt="drink icon"
          />
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => changeSelectedType('drink') }
        >
          <img
            src={ drinkImage }
            data-testid="drinks-bottom-btn"
            alt="drink icon"
          />
          Drinks
        </button>
      </section>
      <div className="card-container" />
      {favorite.map((recipe, index) => (
        <div key={ index } className="recipe-card">
          <NavLink to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              alt="recipe"
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              className="recipe-img"
            />
          </NavLink>
          { recipe.type === 'meal'
            ? (
              <h4 data-testid={ `${index}-horizontal-top-text` }>
                {recipe.nationality}
                {' '}
                -
                {' '}
                {recipe.category}
              </h4>
            )
            : (
              <h4 data-testid={ `${index}-horizontal-top-text` }>
                {recipe.alcoholicOrNot}
              </h4>
            )}
          <NavLink to={ `/${recipe.type}s/${recipe.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </NavLink>

          <button
            type="button"
            onClick={ () => {
              setMessage(true);
              const url = `http://localhost:3000/${recipe.type}s/${recipe.id}`;
              copy(url);
            } }
          >
            <img
              src={ shareIcon }
              alt="compartilhar"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          {message && <p>Link copied!</p>}
          <button
            type="button"
            value={ recipe.id }
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ unfavoriteRecipe }
            src={ blackHeartIcon }
          >
            Desfavoritar

          </button>
        </div>
      ))}
    </div>

  );
}
