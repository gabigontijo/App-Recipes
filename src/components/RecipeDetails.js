import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Header from './Header';

const SEIS = 6;
const copy = require('clipboard-copy');

export default function RecipeDetails() {
  const history = useHistory();
  const [recipe, setRecipe] = useState({});
  const [carousel, setCarousel] = useState([]);
  const [messageCopy, setMessageCopy] = useState(false);
  const [ingredients, setIngredients] = useState([])
  const [measures, setMeasures] = useState([])
  const fetchAPI = async (arg) => {
    const b = arg.pathname.split('/');
    const id = b[2];
    let url = '';
    if (b[1] === 'meals') {
      url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    } else { url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`; }
    const response = await fetch(url);
    const results = await response.json();
    if (Object.keys(results)[0] === 'meals') {
      setRecipe(results.meals[0]);
    } else {
      setRecipe(results.drinks[0]);
    }
  };
  function renderIngredients(param1) {
    const asArray = Object.entries(recipe);
    const filtered = asArray.filter(([key, value]) => key.includes(param1)
    && value !== null && value.trim() !== '');
    const a = filtered.map((el) => el[1]);
    return a;
  }

  const fetchCarousel = async (arg) => {
    const b = arg.pathname.split('/');
    let url = '';
    if (b[1] === 'meals') {
      url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    } else { url = 'https://www.themealdb.com/api/json/v1/1/search.php?s='; }
    const response = await fetch(url);
    const results = await response.json();
    if (b[1] === 'meals') {
      setCarousel(results.drinks);
    } else { setCarousel(results.meals); }
  };

  const sendToProgressPage = () => {
    const { location: { pathname } } = history;
    const id = pathname.split('/')[2];
    if (history.location.pathname.includes('meals')) {
      history.push(`/meals/${id}/in-progress`);
    }
    if (history.location.pathname.includes('drinks')) {
      history.push(`/drinks/${id}/in-progress`);
    }
  };
  useEffect(() => {
    fetchAPI(history.location);
    fetchCarousel(history.location);
  }, [history.location]);

  useEffect(() => {
    setIngredients(renderIngredients('Ingredient'));
    setMeasures(renderIngredients('Measure'));
  }, [recipe]);

  const juntaArrays = () => {
    const newArray = [];
    for (let index = 0; index < measures.length; index += 1) {
      newArray.push(`${measures[index]} ${ingredients[index]}`);
    }
    return newArray;
  };

  const buttonShare = async () => {
    setMessageCopy(true);
    const url = `http://localhost:3000${history.location.pathname}`;
    const messageSaved = await copy(url);
    return messageSaved;
  };

  const favoriteButton = () => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    let newFavorite = [];
    if (history.location.pathname.includes('meals')) {
      newFavorite = {
        id: recipe.idMeal,
        type: 'meal',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      };
    } if (history.location.pathname.includes('drinks')) {
      newFavorite = {
        id: recipe.idDrink,
        type: 'drink',
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      };
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favorite, newFavorite]));
  };

  return (
    <div>
   <div>
    <Header />
   </div>
      <img
        src={ recipe[(Object.keys(recipe)
          .find((el) => el.includes('Thumb')))] }
        alt="imagem"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">
        { recipe[(Object.keys(recipe)
          .find((el) => el.includes('str')))] }
      </p>
      <p data-testid="recipe-category">
        { recipe.strAlcoholic && recipe[(Object.keys(recipe)
          .find((el) => el.includes('Category')))]
          + ` ${recipe.strAlcoholic}`}
      </p>
      {juntaArrays().map((item, index) => (
        <p
          key={ item }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {item}
        </p>
      ))}
      <p data-testid="instructions">{recipe.strInstructions}</p>
      {recipe.strYoutube !== null
      && <embed data-testid="video" src={ recipe.strYoutube } />}
      <div style={ { display: 'flex', overflowY: 'hidden', overflowX: 'scroll' } }>
        {carousel.slice(0, SEIS).map((i, index) => (
          <div
            key={ Number(i.idDrink || i.idMeal) }
            data-testid={ `${index}-recommendation-card` }
          >
            <img
              src={ i.strDrinkThumb || i.strMealThumb }
              alt={ i.strDrink || i.strMeal }
              style={ { maxWidth: '300px' } }
            />
            <p data-testid={ `${index}-recommendation-title` }>
              { i.strDrink || i.strMeal }
            </p>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="start-recipe-button"
        data-testid="start-recipe-btn"
        onClick={ sendToProgressPage }
      >
        Continue Recipe
      </button>
      <button
        data-testid="share-btn"
        className="share-button"
        type="button"
        onClick={ buttonShare }
      >
        <img src={ shareIcon } alt="icone" />
      </button>
      <button
        data-testid="favorite-btn"
        className="favorite-button"
        type="button"
        onClick={ favoriteButton }
      >
        Favoritar
      </button>
      {messageCopy === true && <p>Link copied!</p>}
    </div>
  );
}

RecipeDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
