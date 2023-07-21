import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Nav from './layouts/Nav';
import Router from './router/Router';
import { Box, Container } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>{/* <Nav></Nav> */}</header>
        <div>
          <Container maxWidth="xl" sx={{ bgcolor: '#cfe8fc', boxShadow: 3 }}>
            {/* <Box
              sx={{
                display: 'flex',
                bgcolor: '#cfe8fc',
                height: '100vh',
                boxShadow: 3,
                justifyContent: 'center',
              }}
            > */}
            <Router></Router>
            {/* </Box> */}
          </Container>
        </div>

        <footer></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
