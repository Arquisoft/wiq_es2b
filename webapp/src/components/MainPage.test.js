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

    render(<Router>
        <MainPage />
      </Router>);

    const element1 = screen.getByText(/¡Bienvenido a/);
    const element2 = screen.getByText(/WIQ 2024!/);
    const newGameButton = screen.getByRole('button', { name: 'Nuevo juego' });
    const rankingButton = screen.getByRole('button', { name: 'Ranking' });
    const configButton = screen.getByRole('button', { name: 'Configuración' });

    expect(element1).toBeInTheDocument();
    expect(element2).toBeInTheDocument();

    await act(async () => {
        fireEvent.click(newGameButton);
      });
    
    expect(window.location.pathname).toBe('/Game');

    fireEvent.click(rankingButton);

    expect(window.location.pathname).toBe('/ScoreBoard');

    fireEvent.click(configButton);

    const dialogTitle = screen.getByText('Configuración del juego');
    expect(dialogTitle).toBeInTheDocument();

    const numQuestionsInput = screen.getByLabelText('Número de preguntas (min. 5)');
    const timePerQuestionInput = screen.getByLabelText('Tiempo por pregunta (mín. 10 segundos)');
    const acceptButton = screen.getByRole('button', { name: 'Aceptar' });

    expect(dialogTitle).toBeVisible();
    expect(numQuestionsInput).toBeInTheDocument();
    expect(timePerQuestionInput).toBeInTheDocument();
    expect(acceptButton).toBeInTheDocument();

    fireEvent.change(numQuestionsInput, { target: { value: '10' } });
    fireEvent.change(timePerQuestionInput, { target: { value: '15' } });
    fireEvent.click(acceptButton);
  });
});


