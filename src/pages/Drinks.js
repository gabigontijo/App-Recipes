import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { requestDrinkBySelectedFilter, requestDrinkFilters,
  requestDrinks } from '../service/RequestAPI';
import Recipes from './Recipes';
import cocoa from '../images/cocoa.png'
import ordinary from '../images/ordinary.png'
import shake from '../images/shake.png'
import other from '../images/other.png'
import allDrink from '../images/allDrink.png'
import cocktail from '../images/cocktail.png'

import '../style/Meals.css'

export default function Drinks() {
  const { setTitle, setRecipesData,
    requestDrink, setFilters, filters, setRequestDrink } = useContext(ContextRecipes);
  const TWELVE = 12;
  const FIVE = 5;
  const imgs = [ordinary, cocktail, shake, other,cocoa];

  const submitFilter = ({ target }) => {
    const listFilters = target.parentElement.children;
    for(let filter of listFilters) {
      filter.className = '';
    }
    target.className = 'filterSelected';
    if(target.value === 'All'){
      setRequestDrink([]);
    }else {
      requestDrinkBySelectedFilter(target.value)
      .then((drink) => setRequestDrink(drink.drinks));
    }
  };

  useEffect(() => {
    setTitle('Drinks');
    requestDrinkFilters().then((filter) => setFilters(filter.drinks));
    requestDrinks().then((drink) => {
      setRecipesData(drink.drinks);
    });
  }, [setTitle, setRecipesData, setFilters]);

  return (
    <div>
      <Header />
      <div className="div_drinks">
        <div className="div_categorys">
          {
            filters.length > 0
            && filters.slice(0, FIVE).map((category, index) => (
              <div className="div_categories" key={`${index}-div`} >
              <button
                key={ category.strCategory }
                value={ category.strCategory }
                type="button"
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ submitFilter }
              >
                <img src ={imgs[index]} key={`${index}-img`} alt= {category.strCategory}/>
                <p key={`${index}-name`} >{category.strCategory}</p>
              </button>
              </div>))
          }
          <button
            type="button"
            value="All"
            className="filterSelected"
            data-testid="All-category-filter"
            onClick={ submitFilter }
          >
            <img src={allDrink} alt="all" />
            <p className="all_drink" >All</p>

          </button>
        </div>
        {(requestDrink.length > 1)
          ? requestDrink.slice(0, TWELVE).map((drink, index) => (
            <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` } className="drinks_cards">
              <NavLink to="/drinks"  key={`${index}-link` }>
                <img
                  src={ drink.strDrinkThumb }
                  alt="imagem do drink"
                  data-testid={ `${index}-card-img` }
                  className="drinks_imgs"
                  key={`${index}-img` }
                />
                <p data-testid={ `${index}-card-name` }  className="drinks_name">{drink.strDrink}</p>
              </NavLink>
            </div>
          )) : <Recipes />}
      </div>
      <div className="footer_space"></div>
      <Footer />
    </div>
  );
}
