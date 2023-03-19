import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';

const TWELVE = 12;

export default function Recipes() {
  const { recipesData } = useContext(ContextRecipes);
  const location = useLocation();

  return (
    <div className="recipe-cards">
      <div>
        {(location.pathname === '/drinks')
        && recipesData.slice(0, TWELVE).map((drink, index) => (
          <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
            <NavLink to={ `/drinks/${drink.idDrink}` }  key={ `${index}-navlink2` } >
              <img
                src={ drink.strDrinkThumb }
                alt="imagem do drink"
                data-testid={ `${index}-card-img` }
                key={ `${index}-img2` }
              />
              <p data-testid={ `${index}-card-name` }   key={ `${index}-name2` }>{drink.strDrink}</p>
            </NavLink>
          </div>
        ))}
      </div>
      <div className="meals_cards">
        {(location.pathname === '/meals' && recipesData.length > 0)
        && recipesData.slice(0, TWELVE).map((meal, index) => (
          <div className="meals_card" key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
            <NavLink to={ `/meals/${meal.idMeal}` } key={ `${index}-navlink1` } >
              <img
                src={ meal.strMealThumb }
                alt="imagem do meal"
                data-testid={ `${index}-card-img` }
                className="meals_imgs"
                key={ `${index}-img1` }
              />
              <p data-testid={ `${index}-card-name` } className="meals_name"  key={ `${index}-name1` }>{meal.strMeal}</p>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
