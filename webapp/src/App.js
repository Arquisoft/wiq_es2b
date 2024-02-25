// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Cambiado de Switch a Routes
import AddUser from './components/AddUser';
import Login from './components/Login';
import Juego from './components/Juego';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function App() {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggleView = () => {
    setShowLogin(!showLogin);
  };
  

  return (
    <Router>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
          Bienvenido a WIQ 2024 del curso de Arquitectura del Software
        </Typography>

        <Routes>
          <Route path="/juego" element={<Juego />} />
          <Route path="/" element={
            <>
              {showLogin ? <Login /> : <AddUser />}
              <Typography component="div" align="center" sx={{ marginTop: 2 }}>
                {showLogin ? (
                  <Link name="gotoregister" component="button" variant="body2" onClick={handleToggleView}>
                    ¿No tienes una cuenta? Regístrate aquí.
                  </Link>
                ) : (
                  <Link component="button" variant="body2" onClick={handleToggleView}>
                    ¿Ya tienes cuenta? Inicia sesión aquí.
                  </Link>
                )}


              </Typography>
            </>
          } />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
