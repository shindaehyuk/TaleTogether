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

const defaultTheme = createTheme();

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (event) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/');
    }, 2000); // 로그인 후 메인페이지로 이동
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            <b>Sign in</b>
          </Typography>

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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="비밀번호"
              type="password"
              autoFocus
              {...register('password', {
                required: true,
              })}
              error={!!errors.password}
            />

            <Button disabled={isLoading} type="submit" fullWidth variant="contained" sx={{ mt: 4, mb: 4 }}>
              {isLoading ? <CircularProgress size={24} /> : 'Sign up'}
            </Button>

            <Grid container>
              <Grid item xs={4} sx={{ borderRight: 1, borderColor: 'primary.main' }}>
                <Link href="#" underline="none" variant="body2">
                  비밀번호 찾기
                </Link>
              </Grid>
              <Grid item xs={4} sx={{ borderRight: 1, borderColor: 'primary.main' }}>
                <Link href="#" underline="none" variant="body2">
                  아이디 찾기
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link href="/signup" underline="none">
                  회원가입
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
