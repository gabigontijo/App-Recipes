import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import { saveDoneRecipesLocalStorage,
  saveRecipeInProgressLocalStorage } from '../service/LocalStorage';
import IngredientProgress from './IngredientsProgress';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function MealsInProgress() {
  const history = useHistory();
  const [meal, setMeal] = useState({});
  const [message, setMessage] = useState(false);
  const [favoriteIcon, setFavoriteIcon] = useState('');
  const { disabledBtnFinalizar } = useContext(ContextRecipes);
  const location = useLocation();
  const locationSplit = location.pathname.split('/');
  const id = locationSplit[2];
  const sharePathname = location.pathname.split('/in-progress')[0];

  const fetchAPI = async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const results = await response.json();
    setMeal(results.meals[0]);
  };

  const filterRecipeDone = () => {
    const recipeDone = JSON.parse(localStorage.getItem('inProgressRecipes'));
    delete recipeDone.meals[id];
    saveRecipeInProgressLocalStorage(recipeDone);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  useEffect(() => {
    const favoritesDrinks = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (favoritesDrinks.some((fav) => fav.id === meal.idMeal)) {
      setFavoriteIcon(true);
    }
  }, [meal]);

  const inDate = new Date();

  const saveLocalStorage = {
    id: meal.idMeal,
    type: 'meal',
    nationality: meal.strArea,
    category: meal.strCategory,
    alcoholicOrNot: '',
    name: meal.strMeal,
    image: meal.strMealThumb,
    doneDate: inDate.toISOString(),
    tags: ((meal.strTags !== null && meal.strTags) ? meal.strTags.split(',') : []),
  };

  const handleBtnFinalizar = () => {
    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    saveDoneRecipesLocalStorage([...doneRecipe, saveLocalStorage]);
    filterRecipeDone();
    history.push('/done-recipes');
  };

  const buttonShare = async () => {
    if (!message) {
      setMessage(true);
      const url = `http://localhost:3000${sharePathname}`;
      const messageSaved = await copy(url);
      return messageSaved;
    }
    setMessage(false);
  };

  const newFavorite = {
    id: meal.idMeal,
    type: 'meal',
    nationality: meal.strArea,
    category: meal.strCategory,
    alcoholicOrNot: '',
    name: meal.strMeal,
    image: meal.strMealThumb };

  const favoriteButton = () => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (!favorite.some((fav) => fav.id === meal.idMeal)) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favorite, newFavorite]));
      setFavoriteIcon(true);
    } else {
      const favoriteRemove = favorite.filter((fav) => fav.id !== meal.idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRemove));
      setFavoriteIcon(false);
    }
  };

  return (
    <div>

      <div>
        <img
          data-testid="recipe-photo"
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
        />
        <h2 data-testid="recipe-title">{meal.strMeal}</h2>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ buttonShare }
        >
          <img src={ shareIcon } alt="icone" />

        </button>
        {message && <p>Link copied!</p>}
        <button
          type="button"
          // data-testid="favorite-btn"
          onClick={ favoriteButton }
        >
          <img
            data-testid="favorite-btn"
            src={ (favoriteIcon
              ? blackHeartIcon : whiteHeartIcon) }
            alt="iconeHeart"
          />
        </button>
        <p data-testid="recipe-category">{meal.strCategory}</p>
        <p data-testid="instructions">{meal.strInstructions}</p>
      </div>
      <IngredientProgress recipeType={ meal } />
      <button
        type="button"
        className="finish-button"
        data-testid="finish-recipe-btn"
        disabled={ disabledBtnFinalizar }
        onClick={ handleBtnFinalizar }
      >
        Finalizar

      </button>
    </div>
  );
}
