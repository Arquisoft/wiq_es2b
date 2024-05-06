import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import MainPage from './MainPage';
import { BrowserRouter as Router } from 'react-router-dom';

const mockAxios = new MockAdapter(axios);

describe('MainPage component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('muestra la página principal correctamente', async () => {
    render(
      <Router>
        <MainPage />
      </Router>
    );
  
    const element1 = screen.getByText(/¡Bienvenido a/);
    const element2 = screen.getByText(/WIQ 2024!/);
    const newGameButton = screen.getByRole('button', { name: 'Nuevo juego' });
  
    expect(element1).toBeInTheDocument();
    expect(element2).toBeInTheDocument();
  
    fireEvent.click(newGameButton);
  
    await act(async () => {
    });
    expect(window.location.pathname).toBe('/Game');
  });
});


