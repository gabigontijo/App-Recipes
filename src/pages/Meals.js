import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from './Recipes';
import { requestMealBySelectedFilter,
  requestMealFilters, requestMeals } from '../service/RequestAPI';
import all from '../images/all.png';
import breakfast from '../images/breakfast.png';
import beef from '../images/beef.png';
import dessert from '../images/dessert.png';
import chicken from '../images/chicken.png';
import goat from '../images/goat.png';
import '../style/Meals.css';
import '../style/Footer.css';

export default function Meals() {
  const TWELVE = 12;
  const FIVE = 5;

  const imgs = [ beef, breakfast, chicken, dessert, goat];

  const { setTitle, requestMeal, setRecipesData,
    filters, setFilters, setRequestMeal } = useContext(ContextRecipes);

  const submitFilter = ({ target }) => {
    const listFilters = target.parentElement.children;
    console.log(listFilters[0].alt);
    console.log(target.value);
    for(let filter of listFilters) {
      filter.className = '';
    }
    target.className = 'filterSelected';
    if(listFilters[0].alt === 'all'){
      setRequestMeal([]);
    }else {
      requestMealBySelectedFilter(listFilters[0].alt)
      .then((meal) => setRequestMeal(meal.meals));
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
      <div className="div_meals">
        <div className="div_categorys">
          {
            filters.length > 0
            && filters.slice(0, FIVE).map((category, index) => (
              <div className="div_categories" key={`${index}-div`}>
              <button
                key={ category.strCategory }
                type="button"
                value={ category.strCategory }
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ submitFilter }
                className=""
              >
                <img src ={imgs[index]} key={`${index}-img`} alt= {category.strCategory}/>
              </button>
               <p key={`${index}-name`} >{category.strCategory}</p>
               </div>))
          }
          <button
            type="button"
            value="All"
            className="filterSelected"
            data-testid="All-category-filter"
            onClick={ submitFilter }
          >
            <img src={all} alt="all" />
            <p className="all_meal">All</p>

          </button>
        </div>
        {(requestMeal.length >= 1)
          ? requestMeal.slice(0, TWELVE).map((meal, index) => (
            <div className="meals_cards" key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
              <NavLink to={ `/meals/${meal.idMeal}` }  key={ `${index}-navlink` } className="meals_cards_navlink">
                <img
                  src={ meal.strMealThumb }
                  alt="imagem do meal"
                  data-testid={ `${index}-card-img` }
                  className="meals_imgs"
                  key={ `${index}-img` }
                />
                <p data-testid={ `${index}-card-name` }  key={ `${index}-name` }  className="meals_name">{meal.strMeal}</p>
              </NavLink>
            </div>
          )) : <Recipes />}
      </div>
      <div className="footer_space"></div>
      <Footer />
    </div>

  );
}
