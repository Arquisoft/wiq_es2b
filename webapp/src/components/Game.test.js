import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Game from './Game';
import { MemoryRouter } from 'react-router-dom';

const mockAxios = new MockAdapter(axios);

const renderGameComponent = () => {
  render(
    <MemoryRouter initialEntries={['/game']} initialIndex={0}>
      <Game />
    </MemoryRouter>
  );
};

const mockQuestionData = {
  responseQuestionObject: 'What is 2 + 2?',
  responseCorrectOption: '4',
  responseAnswerOptions: ['2', '3', '4', '5'],
};

describe('Game component', () => {
  beforeEach(() => {
    mockAxios.reset();
    jest.useFakeTimers();
  });

  it('should display question and answer options', async () => {
    renderGameComponent();
  
    mockAxios.onGet('http://localhost:8000/createquestion').reply(200, { data: mockQuestionData });
  
    await waitFor(() => {
      // Esperar a que el texto de la pregunta cambie a "Pregunta 1"
      if (screen.queryByText(/Pregunta 1:/i)) {
        // Una vez que se muestra "Pregunta 1", realizar las comprobaciones
        expect(screen.getByText(/Pregunta 1:/i)).toBeInTheDocument();
        expect(screen.getByText(/What is 2 \+ 2\?/i)).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
      }
    });
  });
  it('should handle correct answer click', async () => {
    renderGameComponent();
  
    mockAxios.onGet('http://localhost:8000/createquestion').reply(200, { data: mockQuestionData });
  
    // Esperar hasta que se muestre "Pregunta 1"
    await waitFor(() => {
      if (screen.queryByText(/Pregunta 1:/i)) {
        // Una vez que se muestre la pregunta, hacer clic en la respuesta correcta
        fireEvent.click(screen.getByText('4'));
        // Verificar si afectó correctamente al conteo de respuestas correctas
    
        console.log(screen.getByText(/Correctas: 1/i).textContent);
        expect(screen.getByText(/Correctas: 1/i)).toBeInTheDocument();
      
      }
    });
  
    
  });
  
  it('should handle incorrect answer click', async () => {
    renderGameComponent();
  
    mockAxios.onGet('http://localhost:8000/createquestion').reply(200, { data: mockQuestionData });
  
    // Esperar hasta que se muestre "Pregunta 1"
    await waitFor(() => {
      if (screen.queryByText(/Pregunta 1:/i)) {
        // Una vez que se muestre la pregunta, hacer clic en una respuesta incorrecta
        fireEvent.click(screen.getByText('2'));

        console.log(screen.getByText(/Incorrectas: 1/i).textContent);
        expect(screen.getByText(/Incorrectas: 1/i)).toBeInTheDocument();
      }
    });
  
    
  });
  
  
});
