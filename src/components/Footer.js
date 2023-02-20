import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkImage from '../images/drinkIcon.svg';
import mealImage from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();
  return (
    <div data-testid="footer" className="Footer">
      <button
        type="button"
        onClick={ () => {
          history.push('./drinks');
        } }
      >
        <img
          src={ drinkImage }
          data-testid="drinks-bottom-btn"
          alt="drink icon"
        />
      </button>
      <button
        type="button"
        onClick={ () => {
          history.push('./meals');
        } }
      >
        <img
          src={ mealImage }
          data-testid="meals-bottom-btn"
          alt="drink icon"
        />
      </button>
    </div>
  );
}
