import axios from 'axios';
import { Container, Typography, Button} from '@mui/material';

const HistoricalData = () => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const  handleShowHistory = async () => {
    try{
      // It makes a petition to the api and store the response
      const response = await axios.post(`${apiEndpoint}/getquestionshistory`, { });
      console.log(response);
    }catch (error){
      console.error('Error:', error);
    }    
  }

  return (
    
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
      <div>
        <Typography variant="h4" gutterBottom>
          Pagina del HistoricalData
        </Typography>

        <Button variant="contained" color="primary" onClick={handleShowHistory}> 
          Histórico de partidas
        </Button>
    </div>
  </Container>

  );
};

export default HistoricalData;