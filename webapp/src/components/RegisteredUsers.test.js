import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {BrowserRouter as Router} from "react-router-dom";
import RegisteredUsers from './RegisteredUsers';

const mockAxios = new MockAdapter(axios);

describe('Registered Users component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('muestra todos los usuarios registrados', async () => {
    const user1 = ['pablo', '4/23/2024'];
    const mockUsers = [user1];
    mockAxios.onGet("http://localhost:8000/getregisteredusers").reply(200, mockUsers);

    render(
      <Router>
        <RegisteredUsers />
      </Router>);

  await waitFor(() => {

    expect(screen.getByText('pablo')).toBeInTheDocument();
    expect(screen.getByText('4/23/2024')).toBeInTheDocument();
    });

  });
});