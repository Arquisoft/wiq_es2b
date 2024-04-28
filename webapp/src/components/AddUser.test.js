import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AddUser from './AddUser';

const mockAxios = new MockAdapter(axios);

const renderAddUserComponent = () => {
  render(<AddUser />);
};

const addUser = async () => {
  const usernameInput = screen.getByLabelText(/Username/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const addUserButton = screen.getByRole('button', { name: /Crear usuario/i });

  fireEvent.change(usernameInput, { target: { value: 'testUser' } });
  fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

  fireEvent.click(addUserButton);
};

describe('AddUser component', () => {
  beforeEach(() => {
    mockAxios.reset();
    jest.useFakeTimers();
  });

  it('should add user successfully', async () => {
    renderAddUserComponent();

    mockAxios.onPost('http://localhost:8000/adduser').reply(200);

    await addUser();

    await waitFor(() => {
      expect(screen.getByText(/User added successfully/i)).toBeInTheDocument();
    });
  });

  it('should handle error when adding user', async () => {
    renderAddUserComponent();

    mockAxios.onPost('http://localhost:8000/adduser').reply(500, { error: 'Internal Server Error' });

    await addUser();

    await waitFor(() => {
      expect(screen.getByText(/Error: Internal Server Error/i)).toBeInTheDocument();
    });
  });

  it('should display proper labels and inputs', () => {
    renderAddUserComponent();

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear usuario/i })).toBeInTheDocument();
  });

  it('should display success Snackbar with autoHideDuration', async () => {
    renderAddUserComponent();

    mockAxios.onPost('http://localhost:8000/adduser').reply(200);

    await addUser();

    jest.runAllTimers();

    expect(screen.queryByText(/User added successfully/i)).toBeNull();

    await waitFor(() => {
      expect(screen.getByText(/User added successfully/i)).toBeInTheDocument();
    });
  });

  it('should display error Snackbar with autoHideDuration', async () => {
    renderAddUserComponent();

    mockAxios.onPost('http://localhost:8000/adduser').reply(500, { error: 'Internal Server Error' });

    await addUser();

    jest.runAllTimers();

    expect(screen.queryByText(/Error: Internal Server Error/i)).toBeNull();

    await waitFor(() => {
      expect(screen.getByText(/Error: Internal Server Error/i)).toBeInTheDocument();
    });
  });
});
