import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';
import { Container, ThemeProvider, createTheme } from '@mui/material';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ['omyu_pretty'],
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <div>
            <Container
              maxWidth="xl"
              sx={{
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#fefae0',
                display: 'flex',
                height: '100vh',
              }}
            >
              <Router></Router>
            </Container>
          </div>

          <footer></footer>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
