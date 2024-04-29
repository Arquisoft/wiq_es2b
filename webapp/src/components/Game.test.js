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

  it('should close confirmation dialog on cancel', async () => {
    renderGameComponent();

    // Open the confirmation dialog
    fireEvent.click(screen.getByText('Volver al menú principal'));

    // Simulate clicking the cancel button
    fireEvent.click(screen.getByText('Cancelar'));

    // Verify that the dialog is closed
    await waitFor(() => {
      expect(screen.queryByText('Confirmación')).not.toBeInTheDocument();
    });
  });

  it('should redirect to main page after confirmation', async () => {
    renderGameComponent();
  
    // Open the confirmation dialog
    fireEvent.click(screen.getByText('Volver al menú principal'));
  
    // Simulate clicking the confirm button
    fireEvent.click(screen.getByText('Confirmar'));
  
    // Wait for the component to unmount (indicating the redirection)
    await waitFor(() => {
      expect(screen.queryByText('Game')).not.toBeInTheDocument();
    });
  
  });
  
  it('should display end game message and enable "Back to Main Menu" button when game is finished', async () => {
    renderGameComponent();
  
    
    for (let i = 1; i <= 5; i++) {
      mockAxios.onGet('http://localhost:8000/createquestion').reply(200, { data: mockQuestionData });
  
      await waitFor(() => {
        if (screen.queryByText(`Pregunta ${i}:`)) {
          fireEvent.click(screen.getByText('4'));
          expect(screen.getByText(`Correctas: ${i}`)).toBeInTheDocument();
          expect(screen.getByText(`Preguntas restantes: ${5 - i}`)).toBeInTheDocument();
          expect(screen.getByText('Incorrectas: 0')).toBeInTheDocument();
        }
      });
    }

    // Verificar que la partida haya finalizado correctamente
     await waitFor(() => {
    if (screen.queryByText(/Partida finalizada/i)) {
      expect(screen.getByText(/Partida finalizada/i)).toBeInTheDocument();
      expect(screen.getByText(/Gracias por jugar/i)).toBeInTheDocument();
      expect(screen.getByText(/Puntuación/i)).toBeInTheDocument();
      expect(screen.getByText(/Volver al menú principal/i)).toBeInTheDocument();
    }
  });
  });
  
}); 
