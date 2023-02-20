import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { saveUserLocalStorage } from '../service/LocalStorage';
import '../style/Login.css';
import logoRecipesApp from '../images/logoRecipesApp.png';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(true);
    const regexEmail = (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email);
    const SIX = 6;
    const validatePassword = password.length > SIX;
    if (regexEmail && validatePassword) {
      setDisabled(false);
    }
  }, [password, email]);

  return (
    <div className="login_container">
      <div className="login_Divlogo">
        <img className="login_logo" src={ logoRecipesApp } alt="logo app" />
      </div>
      <div className="login_div">
        <h1 className="login_title">Login</h1>
        <label htmlFor="email">
          <input
            className="login_input"
            placeholder="Email"
            type="email"
            data-testid="email-input"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="email">
          <input
            className="login_input"
            placeholder="Password"
            type="password"
            data-testid="password-input"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <button
          className="login_button"
          type="button"
          data-testid="login-submit-btn"
          disabled={ disabled }
          onClick={ () => {
            saveUserLocalStorage({ email });
            history.push('./meals');
          } }
        >
          Enter

        </button>
      </div>
    </div>
  );
}
