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
          <Container
            maxWidth="1536px"
            sx={{
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: '#fefae0',
              display: 'flex',
              height: '864px',
              // paddingY: '24px',
            }}
          >
            <Router></Router>
          </Container>

          <footer></footer>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
