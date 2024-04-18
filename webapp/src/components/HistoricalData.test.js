import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import HistoricalData from './HistoricalData';
import { BrowserRouter as Router } from 'react-router-dom';

const mockAxios = new MockAdapter(axios);

describe('HistoricalData', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('muestra la página con el histórico de preguntas generadas', async () => {

    mockAxios.onGet("http://localhost:8000/historicaldata").reply(200, 
        [{ question: "¿Cual es la capital de Venezuela?",
          correctOption: "Caracas",
          incorrectOption1: "Doha",
          incorrectOption2: "Barcelona",
          incorrectOption3: "Nasáu"
        }]);

    render(<Router>
        <HistoricalData />
      </Router>);

    const tableElement = screen.getByRole('table');

    // Verifica si el elemento se encuentra en el DOM
    expect(tableElement).toBeInTheDocument();


    await waitFor(() => {
        expect(screen.getByText('Pregunta')).toBeInTheDocument();
        expect(screen.getByText('Opción correcta')).toBeInTheDocument();
        expect(screen.getByText('Opción incorrecta 1')).toBeInTheDocument();
        expect(screen.getByText('Opción incorrecta 2')).toBeInTheDocument();
        expect(screen.getByText('Opción incorrecta 3')).toBeInTheDocument();

        expect(screen.getByText('¿Cual es la capital de Venezuela?')).toBeInTheDocument();
        expect(screen.getByText('Caracas')).toBeInTheDocument();
        expect(screen.getByText('Doha')).toBeInTheDocument();
        expect(screen.getByText('Barcelona')).toBeInTheDocument();
        expect(screen.getByText('Nasáu')).toBeInTheDocument();
      
      });
  });
});


