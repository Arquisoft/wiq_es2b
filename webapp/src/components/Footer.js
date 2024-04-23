import React from 'react';
import './Footer.css'; // Importa el archivo de estilos CSS
import { AppBar, Toolbar, Typography } from '@mui/material';

const Footer = () => {
    return (
        <AppBar className="footer">
            <Toolbar>
                <Typography variant="body1" className='fs-6' color="textSecondary">
                    © {new Date().getFullYear()} Hecho con ❤️ por <a href="https://github.com/coral2742">Coral</a>, <a href="https://github.com/baraganio">Carlos</a>, <a href="https://github.com/uo264915">Pablo</a> y <a href="https://github.com/UO290054">Raymond</a>. ASW - Curso 2023-24
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
