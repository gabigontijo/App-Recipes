import React from 'react';
import { useLocation } from 'react-router-dom';
import DrinksInProgress from '../components/DrinksInProgress';
import Header from '../components/Header';
import MealsInProgress from '../components/MealsInProgress';

export default function RecipeInProgress() {
  const location = useLocation();
  const locationType = location.pathname.split('/')[1];

  return (
    <div>
       <Header />
      {locationType === 'meals'
      && (
        <div>
          <MealsInProgress />
        </div>
      )}
      {locationType === 'drinks'
      && (

        <div>
          <DrinksInProgress />
        </div>
      )}

    </div>
  );
}
