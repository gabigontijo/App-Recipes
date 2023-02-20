import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from './ContextRecipes';

export default function ProviderRecipes({ children }) {
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState(false);
  const [requestMeal, setRequestMeal] = useState([]);
  const [requestDrink, setRequestDrink] = useState([]);
  const [recipesData, setRecipesData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filterToggle, setFilterToggle] = useState(true);
  const [disabledBtnFinalizar, setDisabledBtnFinalizar] = useState(true);

  const value = useMemo(() => ({
    filterToggle,
    filters,
    recipesData,
    search,
    title,
    setTitle,
    setSearch,
    requestDrink,
    requestMeal,
    setRequestDrink,
    setRequestMeal,
    setRecipesData,
    setFilters,
    setFilterToggle,
    disabledBtnFinalizar,
    setDisabledBtnFinalizar,
  }), [recipesData, title, setTitle, search, filters,
    setFilters, setSearch, requestDrink, requestMeal,
    setRecipesData, filterToggle, setFilterToggle, disabledBtnFinalizar,
    setDisabledBtnFinalizar]);

  return (
    <ContextRecipes.Provider value={ value }>{ children }</ContextRecipes.Provider>
  );
}

ProviderRecipes.propTypes = {
  children: PropTypes.node.isRequired,
};
