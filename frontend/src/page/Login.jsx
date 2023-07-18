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

const defaultTheme = createTheme();

export default function SignIn() {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const changeHandler = (e) => {
    setInput({
      ...input,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(input);
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

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={changeHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={changeHandler}
            />

            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 3 }}>
              Sign In
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
