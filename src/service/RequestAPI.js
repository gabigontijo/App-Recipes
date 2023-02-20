export const requestMealByIngredient = async (ingredient) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const request = await fetch(endpoint);
  const DATA = await request.json();
  return DATA;
};

export const requestMealByName = async (name) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const request = await fetch(endpoint);
  const DATA = await request.json();
  return DATA;
};

export const requestMealByFirstLetter = async (firstLetter) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const request = await fetch(endpoint);
  const DATA = await request.json();
  return DATA;
};

export const requestDrinkByIngredient = async (ingredient) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const request = await fetch(endpoint);
  const DATA = await request.json();
  return DATA;
};

export const requestDrinkByName = async (name) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const request = await fetch(endpoint);
  const DATA = await request.json();
  return DATA;
};

export const requestDrinkByFirstLetter = async (firstLetter) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const request = await fetch(endpoint);
  const DATA = await request.json();
  return DATA;
};

export const requestDrinks = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(endpoint);
  const DATA = await request.json();
  return DATA;
};

export const requestMeals = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(endpoint);
  const DATA = await request.json();
  return DATA;
};

export const requestMealFilters = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const request = await fetch(endpoint);
  const DATA = await request.json();
  return DATA;
};

export const requestDrinkFilters = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const request = await fetch(endpoint);
  const DATA = await request.json();
  return DATA;
};

export const requestDrinkBySelectedFilter = async (filter) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`;
  const request = await fetch(endpoint);
  const DATA = await request.json();
  return DATA;
};

export const requestMealBySelectedFilter = async (filter) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`;
  const request = await fetch(endpoint);
  const DATA = await request.json();
  return DATA;
};
