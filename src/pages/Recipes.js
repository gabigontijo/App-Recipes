import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';

const TWELVE = 12;

export default function Recipes() {
  const { recipesData } = useContext(ContextRecipes);
  const location = useLocation();

  return (
    <div>
      <div>
        {(location.pathname === '/drinks')
        && recipesData.slice(0, TWELVE).map((drink, index) => (
          <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
            <NavLink to={ `/drinks/${drink.idDrink}` }>
              <img
                src={ drink.strDrinkThumb }
                alt="imagem do drink"
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
            </NavLink>
          </div>
        ))}
      </div>
      <div>
        {(location.pathname === '/meals' && recipesData.length > 0)
        && recipesData.slice(0, TWELVE).map((meal, index) => (
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
        ))}
      </div>
    </div>
  );
}
