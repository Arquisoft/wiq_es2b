import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Estado para controlar la visibilidad del dropdown del historial
  const [historialDropdownOpen, setHistorialDropdownOpen] = useState(false);

  // Función para alternar la visibilidad del dropdown del historial
  const toggleHistorialDropdown = () => {
    setHistorialDropdownOpen(!historialDropdownOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">WIQ 2024</Link>
        <button className="navbar-toggler" type="button" onClick={toggleHistorialDropdown}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${historialDropdownOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/mainPage">Página principal</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/game">Jugar</Link>
            </li>
            <li className={`nav-item dropdown ${historialDropdownOpen ? 'show' : ''}`} onClick={toggleHistorialDropdown}>
              <Link className="nav-link dropdown-toggle" to="#" role="button">
                Historial
              </Link>
              <div className={`dropdown-menu ${historialDropdownOpen ? 'show' : ''}`}>
                <Link className="dropdown-item" to="/historicaldata">Historial de preguntas</Link>
                <Link className="dropdown-item" to="/historicalUserdata">Historial de usuario</Link>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/RegisteredUsers">Usuarios registrados</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
