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

    mockAxios.onGet("http://localhost:8000/getquestionshistory").reply(200, 
        [{ question: "¿Cual es la capital de Venezuela?",
          correctOption: "Caracas",
          incorrectOption1: "Doha",
          incorrectOption2: "Barcelona",
          incorrectOption3: "Nasáu"
        },
        {
          question: "¿Cuál es la capital de Francia?",
          correctOption: "París",
          incorrectOption1: "Londres",
          incorrectOption2: "Madrid",
          incorrectOption3: "Roma"
        }
      ]);

    render(<Router>
        <HistoricalData />
      </Router>);

    await waitFor(() => {

        expect(screen.getByText('¿Cual es la capital de Venezuela?')).toBeInTheDocument();
        expect(screen.getByText('Caracas')).toBeInTheDocument();
        expect(screen.getByText('Doha')).toBeInTheDocument();
        expect(screen.getByText('Barcelona')).toBeInTheDocument();
        expect(screen.getByText('Nasáu')).toBeInTheDocument();

        expect(screen.getByText('¿Cuál es la capital de Francia?')).toBeInTheDocument();
        expect(screen.getByText('París')).toBeInTheDocument();
        expect(screen.getByText('Londres')).toBeInTheDocument();
        expect(screen.getByText('Madrid')).toBeInTheDocument();
        expect(screen.getByText('Roma')).toBeInTheDocument();
      
      });
  });
});


