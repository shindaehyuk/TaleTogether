import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/userSlice';
import LoginAxios from '../../api/auth/LoginAxios';

const defaultTheme = createTheme();

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (event) => {
    setIsLoading(true);
    dispatch(login());
    LoginAxios(event);

    setTimeout(() => {
      navigate('/main');
    }, 2000); // 로그인 후 메인페이지로 이동
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="이메일"
              autoFocus
              {...register('email', {
                required: true,
              })}
              error={!!errors.email}
              sx={{ backgroundColor: '#faedcd', borderRadius: '5px' }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="비밀번호"
              type="password"
              {...register('password', {
                required: true,
              })}
              error={!!errors.password}
              sx={{ backgroundColor: '#faedcd', borderRadius: '5px' }}
            />
            <Grid container>
              <Grid item xs={12} sx={{ color: 'black' }}>
                <Link href="#" underline="none" variant="body2">
                  <b>비밀번호 재설정</b>
                </Link>
              </Grid>
            </Grid>
            <Button
              disabled={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              // color="#faedcd"
              sx={{ mt: 4, mb: 4, backgroundColor: '#faedcd', color: 'black' }}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Sign in'}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
