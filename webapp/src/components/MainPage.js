import { Container, Typography, Button} from '@mui/material';
import { useNavigate} from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();

    const handleShowGame = () => {
        let path= '/Game';
        navigate(path);
    };

    const handleShowHistoricalData = () => {
        let path= '/HistoricalData';
        navigate(path);
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
            <div>
                <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
                ¡Bienvenido a WIQ 2024!
                </Typography>

                <Typography component="p" variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
                Puedes comenzar la partida o ver tu historial.
                </Typography>


                {/* <Typography component="p" variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
                Your account was created on {createdAt}.
                </Typography> */}

                {/* Se declaran los botones en los q al hacer click se ejecuta el metodo especificado en onClick*/}
                <Button variant="contained" color="primary" onClick={handleShowGame}>
                Empezar juego
                </Button>
                <Button variant="contained" color="primary" onClick={handleShowHistoricalData}> 
                Histórico de partidas
                </Button>
            </div>
          </Container>
    )
}

export default MainPage;