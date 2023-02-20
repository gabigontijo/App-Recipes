import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const history = useHistory();
  const { setTitle } = useContext(ContextRecipes);
  useEffect(() => {
    setTitle('Profile');
  }, [setTitle]);
  const user = JSON.parse(localStorage.getItem('user'));

  const logoutFunction = () => {
    localStorage.clear();
    history.push('./');
  };

  return (
    <div>
      <Header />
      <p data-testid="profile-email">{user?.email}</p>
      <button
        onClick={ () => {
          history.push('./done-recipes');
        } }
        type="button"
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        onClick={ () => {
          history.push('./favorite-recipes');
        } }
        type="button"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        onClick={ logoutFunction }
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}
