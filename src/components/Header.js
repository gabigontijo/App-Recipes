import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import avat from '../images/avat.png';
import lupa from '../images/lupa.png';
import SearchBar from './SearchBar';
import imgHeader from '../images/imgHeader.png';
import '../style/Header.css';

export default function Header() {
  const { title,
    search, setSearch,
  } = useContext(ContextRecipes);
  const history = useHistory();

  return (
    <header className="header">
      <div className="header_div">
        <div className="header_div_title">
          <img src={ imgHeader } alt="imagem logo header" />
          <h4 data-testid="page-title" className="header_title">{title}</h4>
        </div>
        <div className="header_div_btn">
          <button
            className="header_btn"
            type="button"
            onClick={ () => {
              history.push('./profile');
            } }
          >
            <img
              src={ avat }
              data-testid="profile-top-btn"
              alt="profile icon"
            />
          </button>
          <button
          type="button"
          onClick={ () => {
            history.goBack();
          } }>Back</button>
          {
            (title === 'Done Recipes'
        || title === 'Favorite Recipes'
        || title === 'Profile')
              ? null
              : (
                <button
                  className="header_btn"
                  type="button"
                  onClick={ () => {
                    setSearch(!search);
                  } }
                >
                  <img
                    src={ lupa }
                    data-testid="search-top-btn"
                    alt="search icon"
                  />
                </button>
              )
          }
        </div>
      </div>
      {search
        ? <SearchBar />
        : null}
    </header>
  );
}
