import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import Footer from '../components/Footer';
import drinkImage from '../images/drinkIcon.svg';
import mealImage from '../images/mealIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';

const copy = require('clipboard-copy');

export default function DoneRecipes() {
  const [done, setDone] = useState([]);
  const history = useHistory();
  const [message, setMessage] = useState(false);
  const { setTitle } = useContext(ContextRecipes);
  useEffect(() => {
    setTitle('Done Recipes');
  }, [setTitle]);

  useEffect(() => {
    const local = JSON.parse((localStorage.getItem('doneRecipes') || '[]'));
    setDone(local);
  }, []);

  const handleClick = (recipe) => {
    setMessage(true);
    const copied = `http://localhost:3000/${recipe.type}s/${recipe.id}`;
    copy(copied);
  };

  const goFilter = (str) => {
    const local = JSON.parse((localStorage.getItem('doneRecipes') || '[]'));
    const arr = local.filter((el) => el.type.includes(str));
    setDone(arr);
  };
  return (
    <div>
      <Header />
      <section>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => goFilter('') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => goFilter('meal') }
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
          onClick={ () => goFilter('drink') }
        >
          <img
            src={ drinkImage }
            data-testid="drinks-bottom-btn"
            alt="drink icon"
          />
          Drinks
        </button>
      </section>
      <div className="card-container">
        {
          done.map((el, index) => (
            <div className="card" key={ el.id }>

              <input
                type="image"
                src={ el.image }
                alt=""
                data-testid={ `${index}-horizontal-image` }
                onClick={ () => history.push(`/${el.type}s/${el.id}`) }
              />

              <Link to={ `/${el.type}s/${el.id}` }>
                <p data-testid={ `${index}-horizontal-name` }>{el.name}</p>
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {(el.type === 'meal')
                  ? `${el.nationality} - ${el.category}` : el.alcoholicOrNot }

              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>{el.doneDate}</p>
              {message && <p>Link copied!</p>}
              <button
                type="button"
                onClick={ () => handleClick(el) }
              >
                <img
                  src={ shareIcon }
                  alt="compartilhar"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
              {el.tags.map((tag) => (
                <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
              ))}
            </div>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}
