import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const defaultTheme = createTheme();

export default function SignUp() {
  const [input, setInput] = useState({
    email: '',
    nickname: '',
    password: '',
    checkPassword: '',
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const changeHandler = (event) => {
    setInput({
      ...input,
      [event.target.id]: event.target.value,
    });
  };
  const onSubmit = (event) => {
    // event.preventDefault();
    console.log(event);
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
            <b>Sign up</b>
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  // autoComplete="given-name"
                  // name="email"
                  required
                  fullWidth
                  // id="email"
                  label="이메일"
                  autoFocus
                  onChange={changeHandler}
                  {...register('email', {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/,
                      message: '이메일형식이 아닙니다.',
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="nickname"
                  label="닉네임"
                  name="nickname"
                  {...register('nickname', {
                    required: true,
                    pattern: {
                      value: /^[a-zA-Zㄱ-힣0-9-_.]{2,12}$/,
                      message: '*한글, 영문, 특수문자를 (- _ .) 포함한 4 ~ 12글자',
                    },
                  })}
                  error={!!errors.nickname}
                  helperText={errors.nickname?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="비밀번호"
                  type="password"
                  autoComplete="new-password"
                  {...register('password', {
                    required: true,
                    pattern: {
                      value: /(?=.*[a-zA-ZS])(?=.*?[#?!@$%^&*-]).{6,24}/,
                      message: '*문자와 특수문자 조합의 6~24 자리',
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="checkPassword"
                  label="비밀번호 확인"
                  type="checkPassword"
                  id="checkPassword"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 4, mb: 4 }}>
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
