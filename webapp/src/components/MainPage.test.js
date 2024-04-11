import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import MainPage from './MainPage';

const mockAxios = new MockAdapter(axios);

describe('MainPage component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('muestra la página principal correctamente', async () => {

    render(<UserProvider>
      <Router>
        <MainPage />
      </Router>
    </UserProvider>);

    const element1 = screen.getByText(/¡Bienvenido a/);
    const element2 = screen.getByText(/WIQ 2024!/);
    const newGameButton = screen.getByRole('button', { name: 'Nuevo juego' });
    const historicalQuestionsButton = screen.getByRole('button', { name: 'Historial de preguntas' });
    const historialUserDataButton = screen.getByRole('button', { name: 'Historial del usuario' });
    const registerUsersButton = screen.getByRole('button', { name: 'Usuarios Registrados' });

    // Verifica si el elemento se encuentra en el DOM
    expect(element1).toBeInTheDocument();
    expect(element2).toBeInTheDocument();

    // Simulate user input
    await act(async () => {
        fireEvent.click(newGameButton);
        fireEvent.click(historicalQuestionsButton);
        fireEvent.click(historialUserDataButton);
        fireEvent.click(registerUsersButton);
      });
  });
});


