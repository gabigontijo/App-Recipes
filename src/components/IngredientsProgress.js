import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import '../style/IngredientsInProgress.css';
import { useHistory } from 'react-router-dom';
import { saveRecipeInProgressLocalStorage } from '../service/LocalStorage';
import ContextRecipes from '../context/ContextRecipes';

export default function IngredientProgress(props) {
  const { recipeType } = props;
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = history.location.pathname.split('/')[2];
  // RIP = Recipe In Progress
  const [rip, setRip] = useState({ meals: { }, drinks: { } });
  const [checkedMap, setCheckedMap] = useState({});
  const [started, setStarted] = useState(false);
  const { setDisabledBtnFinalizar } = useContext(ContextRecipes);

  const isChecked = (param) => {
    const newCheckedMap = {};
    if (pathname.includes('/meals')) {
      param.meals[id]?.forEach((el) => {
        newCheckedMap[el] = true;
      });
    }
    if (pathname.includes('/drinks')) {
      param.drinks[id]?.forEach((el) => {
        newCheckedMap[el] = true;
      });
    }
    setCheckedMap(newCheckedMap);
  };

  useEffect(() => {
    let items;
    items = JSON.parse(localStorage.getItem('inProgressRecipes'));
    items = items === null ? rip : items;
    if (!started) {
      setRip(items);
      setStarted(true);
    } else {
      items = rip;
    }
    isChecked(items);
    saveRecipeInProgressLocalStorage(items);
  }, [rip]);

  function renderIngredients(param1) {
    const asArray = Object.entries(recipeType);
    const filtered = asArray.filter(([key, value]) => key.includes(param1)
    && value !== null && value !== '');
    const ingredients = filtered.map((el) => el[1]);
    return ingredients;
  }

  const ingredientsName = renderIngredients('Ingredient');
  const IngredientsQuantity = renderIngredients('Measure');

  const juntaArrays = () => {
    const newArray = [];
    for (let index = 0; index < ingredientsName.length; index += 1) {
      newArray.push(`${IngredientsQuantity[index]} ${ingredientsName[index]}`);
    }
    return newArray;
  };

  const handleCheckbox = ({ target }) => {
    if (target.checked) {
      target.parentElement.className = 'radio-ckecked';
    }
    if (!target.checked) {
      target.parentElement.className = '';
      if (pathname.includes('/meals')) {
        setRip({
          meals: { [id]: rip.meals[id]?.filter((meal) => meal !== +target.name) },
          drinks: rip.drinks });
      }
      if (pathname.includes('/drinks')) {
        setRip({
          meals: rip.meals,
          drinks: { [id]: rip.drinks[id]?.filter((drink) => drink !== +target.name) } });
      }
    }
  };

  const handleDisableBtnFinalizar = () => {
    if (juntaArrays().length === Object.keys(checkedMap).length + 1) {
      setDisabledBtnFinalizar(false);
    } else {
      setDisabledBtnFinalizar(true);
    }
  };

  const handleClickCheckbox = ({ target }) => {
    const { name } = target;
    if (pathname.includes('/meals')) {
      if (!rip.meals[id]) {
        setRip({ meals: { [id]: [+name] }, drinks: rip.drinks });
      } else {
        setRip({ meals: { [id]: [...rip.meals[id], +name] },
          drinks: rip.drinks });
        setCheckedMap(!checkedMap[+name]);
        handleDisableBtnFinalizar();
      }
    } if (pathname.includes('/drinks')) {
      if (!rip.drinks[id]) {
        setRip({ meals: rip.meals, drinks: { [id]: [+name] } });
      } else {
        setRip({ meals: rip.meals,
          drinks: { [id]: [...rip.drinks[id], +name] } });
      }
      setCheckedMap(!checkedMap[+name]);
      handleDisableBtnFinalizar();
    }
  };

  return (
    <div>
      {juntaArrays().map((ingred, index) => (
        <label
          key={ ingred }
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ ingred }
          className={ checkedMap[index] ? 'radio-ckecked' : '' }
        >
          {ingred}
          {' '}
          <input
            type="checkbox"
            name={ index }
            id={ ingred }
            checked={ checkedMap[index] }
            onChange={ handleCheckbox }
            onClick={ handleClickCheckbox }
          />
          {' '}

        </label>))}

    </div>
  );
}

IngredientProgress.propTypes = {
  recipeType: PropTypes.shape({
  }).isRequired,
};
