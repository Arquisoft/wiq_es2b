import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { Container, Button} from '@mui/material';

const RegisteredUsers = () => {
  const navigate = useNavigate();
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    handleShowHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const  handleShowHistory = async () => {
    try{
      // It makes a petition to the api and store the response
      const response = await axios.get(`${apiEndpoint}/getregisteredusers`, { });
      setRegisteredUsers(response.data);
    }catch (error){
      console.error('Error:', error);
    }    
  }

  const  handlePreviousPage = async () => {
    let path= '/MainPage';
    navigate(path); 
  }

  return (
    
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }} className='contenedor' >
      
      <div title='botones'>
        <Button variant="contained" color="primary" onClick={handlePreviousPage}> 
          Página anterior
        </Button>
    </div>
    <div>
        <table>
          <thead>
            <tr>
              <th title='pregunta'>Nombre de usuario</th>
              <th title='correcta'>Fecha de registro</th>
            </tr>
          </thead>
          <tbody>
            {registeredUsers.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  </Container>

  );
};

export default RegisteredUsers;