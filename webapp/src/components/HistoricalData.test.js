import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import HistoricalData from './HistoricalData';
import { BrowserRouter as Router } from 'react-router-dom';

const mockAxios = new MockAdapter(axios);

describe('HistoricalData component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('muestra la página con el histórico de preguntas generadas', async () => {

    const question1 = ['¿Cual es la capital de Venezuela?', 'Caracas', 'Doha', 'Barcelona', 'Nasáu'];
    const question2 = ['¿Cual es la capital de Francia?', 'París', 'Londres', 'Madrid', 'Roma'];
    const mockUsers = [question1, question2];
    mockAxios.onGet("http://localhost:8000/getquestionshistory").reply(200, mockUsers);

    render(<Router>
        <HistoricalData />
      </Router>);

    await waitFor(() => {

        expect(screen.getByText('¿Cual es la capital de Venezuela?')).toBeInTheDocument();
        expect(screen.getByText('Caracas')).toBeInTheDocument();
        expect(screen.getByText('Doha')).toBeInTheDocument();
        expect(screen.getByText('Barcelona')).toBeInTheDocument();
        expect(screen.getByText('Nasáu')).toBeInTheDocument();

        expect(screen.getByText('¿Cual es la capital de Francia?')).toBeInTheDocument();
        expect(screen.getByText('París')).toBeInTheDocument();
        expect(screen.getByText('Londres')).toBeInTheDocument();
        expect(screen.getByText('Madrid')).toBeInTheDocument();
        expect(screen.getByText('Roma')).toBeInTheDocument();

        expect(screen.getByText('Rows per page:')).toBeInTheDocument();
      
      });
  });
});


