import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';
import { Container, ThemeProvider, createTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from './redux/slices/userSlice';

function App() {
  const dispatch = useDispatch();
  const theme = createTheme({
    typography: {
      fontFamily: ['omyu_pretty'],
    },
  });

  // 토큰이 변경되면 로그아웃 처리
  window.addEventListener('storage', (event) => {
    if (event.key === 'token') {
      dispatch(logout());
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <Container
            maxWidth="100%"
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
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
