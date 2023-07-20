import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Alert, Snackbar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setOpen(true);
    }, 2000); // 2초 후에 프로그레스 바가 사라짐

    setTimeout(() => {
      navigate('/login');
    }, 4000); // 4초 후에 로그인 페이지로 이동

    console.log(data);
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
          <Snackbar open={open} autoHideDuration={4000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert severity="success" sx={{ width: '100%' }}>
              회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.
            </Alert>
          </Snackbar>

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
                  required
                  fullWidth
                  label="이메일"
                  autoFocus
                  {...register('email', {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
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
                  label="닉네임"
                  {...register('nickname', {
                    required: true,
                    pattern: {
                      value: /^[a-zA-Zㄱ-힣0-9-_.]{2,12}$/,
                      message: '*한글, 영문, 특수문자를 (- _ .) 포함한 2 ~ 12글자',
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
                  required
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
                  type="password"
                  label="비밀번호 확인"
                  {...register('checkpw', {
                    required: true,
                    validate: (value) => {
                      if (value !== watch('password')) {
                        return '비밀번호가 같지 않습니다.';
                      }
                      return true;
                    },
                  })}
                  error={!!errors.checkpw}
                  helperText={errors.checkpw?.message}
                />
              </Grid>
            </Grid>

            <Button disabled={isLoading} type="submit" fullWidth variant="contained" sx={{ mt: 4, mb: 4 }}>
              {isLoading ? <CircularProgress size={24} /> : 'Sign up'}
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
