import React, { useState } from 'react';
import AddUser from './components/AddUser';
import Login from './components/Login';

function App() {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggleView = () => {
    setShowLogin(!showLogin);
  };
  
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Bienvenido a WIQ 2024 del curso de Arquitectura del Software</h1>
      {showLogin ? <Login /> : <AddUser />}
      <div className="mt-4">
        {showLogin ? (
          <button className="text-blue-500 hover:text-blue-700" onClick={handleToggleView}>
            ¿No tienes una cuenta? Regístrate aquí.
          </button>
        ) : (
          <button className="text-blue-500 hover:text-blue-700" onClick={handleToggleView}>
            ¿Ya tienes cuenta? Inicia sesión aquí.
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
