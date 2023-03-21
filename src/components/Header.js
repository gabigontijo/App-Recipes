import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import avat from '../images/icone-perfil.svg';
import lupa from '../images/icone_pesquiar.svg';
import SearchBar from './SearchBar';
import back from '../images/Arrow.svg';
// import imgHeader from '../images/imgHeader.png';
import logoHeader from '../images/tasty.png';
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
        <button
          type="button"
          className="back-btn"
          onClick={ () => {
            history.goBack();
          } }>
            <img
              src={ back }
              alt="search icon"
                  />
          </button>
          <h4 data-testid="page-title" className="header_title">{title}</h4>
        </div>
          <img src={ logoHeader } className="header_logo" alt="imagem logo header" />
        <div className="header_div_btn">
          <button
            className="header_btn"
            type="button"
            onClick={ () => {
              history.push('/profile');
            } }
          >
            <img
              src={ avat }
              data-testid="profile-top-btn"
              alt="profile icon"
            />
          </button>
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
