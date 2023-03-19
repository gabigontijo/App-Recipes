import React from 'react';
import { useHistory } from 'react-router-dom';
import foodfooter from '../images/foodfooter.png';
import bebida from '../images/icone-bebida.png';

export default function Footer() {
  const history = useHistory();
  return (
    <div data-testid="footer" className="Footer">
      <button
        type="button"
        onClick={ () => {
          history.push('./drinks');
        }
        }
        className="Footer-btn"
        >
        <img
          src={ bebida }
          data-testid="drinks-bottom-btn"
          alt="drink icon"
          className="Footer-img"
        />
      </button>
      <button
        type="button"
        onClick={ () => {
          history.push('./meals');
        } }
        className="Footer-btn"
      >
        <img
          src={ foodfooter }
          data-testid="meals-bottom-btn"
          alt="drink icon"
          className="Footer-img"
        />
      </button>
    </div>
  );
}
