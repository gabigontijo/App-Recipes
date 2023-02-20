import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/RenderWithRouter';

describe('test page Login', () => {
  test('email, password e btn Login', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const enterButton = screen.getByTestId('login-submit-btn');

    expect(email && password && enterButton).toBeInTheDocument();
    expect(enterButton).toBeDisabled();

    userEvent.type(email, 'gontijo@test.com');
    userEvent.type(password, '1234567');
    expect(enterButton).toBeEnabled();

    userEvent.click(enterButton);
    expect(history.location.pathname).toBe('/meals');
  });
});
