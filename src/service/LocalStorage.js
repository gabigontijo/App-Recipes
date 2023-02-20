export const saveUserLocalStorage = (param) => {
  localStorage.setItem('user', JSON.stringify(param));
};

export const saveRecipeInProgressLocalStorage = (param) => {
  localStorage.setItem('inProgressRecipes', JSON.stringify(param));
};

export const saveDoneRecipesLocalStorage = (param) => {
  localStorage.setItem('doneRecipes', JSON.stringify(param));
};
