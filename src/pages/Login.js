import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { saveUserLocalStorage } from '../service/LocalStorage';
import '../style/Login.css';
import logoRecipesApp from '../images/tasty.png'

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMsgEmail, setShowMsgEmail] = useState(false);
  const [showMsgPassword, setShowMsgPassword] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    if (password.length === 0 && email.length === 0) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
    const regexEmail = (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email);
    const SIX = 6;
    const validatePassword = password.length > SIX;
    if (!regexEmail && email.length > 0) {
      setShowMsgEmail(true);
    } else {
      setShowMsgEmail(false);
    }

    if (!validatePassword && password.length > 0) {
      setShowMsgPassword(true);
    } else {
      setShowMsgPassword(false);
    }
  }, [password, email, showMsgEmail, showMsgPassword]);

  const clickEnter = () => {
    if (showMsgEmail || showMsgPassword || disableButton) {
      toast('Preencha os campos corretamente!', {
        type: 'error',
        theme: 'colored',
      });
    } else {
      saveUserLocalStorage({ email });
      history.push('./meals');
    }
  };

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
        {(showMsgEmail)
         && (
           <p className="warn_input">
             Email deve ser no formato 'email@test.com'
           </p>)}
        <label htmlFor="password">
          <input
            className="login_input"
            placeholder="Password"
            type="password"
            data-testid="password-input"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        {(showMsgPassword)
         && (
           <p className="warn_input">
             Password deve ter no mínimo 6 caracteres
           </p>)}
        <button
          className="login_button"
          type="button"
          data-testid="login-submit-btn"
          onClick={ clickEnter }
        >
          Enter

        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
