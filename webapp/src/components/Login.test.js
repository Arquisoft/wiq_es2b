import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router } from "react-router-dom"; // No necesitas el alias aquí
import Login from './Login';
import { createMemoryHistory } from 'history';

const mockAxios = new MockAdapter(axios);

describe('Login component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('should log in successfully', async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Iniciar sesión/i });

    // Mock the axios.post request to simulate a successful response
    mockAxios.onPost('http://localhost:8000/login').reply(200, { createdAt: '2024-01-01T12:34:56Z' });

    // Simulate user input
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: 'testUser' } });
      fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
      fireEvent.submit(loginButton);
    });
  });

  it('should handle error when logging in', async () => {
    render(
      <Router>
        <Login />
      </Router>);

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Iniciar sesión/i });

    // Mock the axios.post request to simulate an error response
    mockAxios.onPost('http://localhost:8000/login').reply(401, { error: 'Invalid credentials' });

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/Error: Invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('should redirect to MainPage after successful login', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Login />
      </Router>
    );

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Iniciar sesión/i });

    // Mock the axios.post request to simulate a successful response
    mockAxios.onPost('http://localhost:8000/login').reply(200, { createdAt: '2024-01-01T12:34:56Z' });

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/Login successful/i)).toBeInTheDocument();
    });

    // Check if the redirection happens after the successful login
    expect(history.location.pathname).toBe('/');
  });
});
