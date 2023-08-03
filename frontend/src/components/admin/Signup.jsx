import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Alert, Snackbar } from "@mui/material";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm } from "react-hook-form";
import { useState } from "react";
import SignupAxios from "../../api/auth/Post/SignupAxios";
import IdcheckAxios from "../../api/auth/Post/IdcheckAxios";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [idCheck, setIdCheck] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const emailCheck = async () => {
    try {
      const response = await IdcheckAxios(watch("email", false));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    SignupAxios(data);

    setTimeout(() => {
      setIsLoading(false);
      setOpen(true);
    }, 2000); // 2초 후에 프로그레스 바가 사라짐

    // setTimeout(() => {
    //   window.location.reload();
    // }, 4000); // 4초 후에 로그인 페이지로 이동
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Snackbar
            open={open}
            autoHideDuration={4000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.
            </Alert>
          </Snackbar>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{}}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  className="animate__animated animate__fadeIn animate__delay-0.3s"
                  size="small"
                  required
                  fullWidth
                  label="이메일"
                  autoFocus
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "이메일형식이 아닙니다.",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    sx: { backgroundColor: "#faedcd", borderRadius: "5px" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className="animate__animated animate__fadeIn animate__delay-0.6s"
                  size="small"
                  required
                  fullWidth
                  label="닉네임"
                  {...register("nickname", {
                    required: true,
                    pattern: {
                      value: /^[a-zA-Zㄱ-힣0-9-_.]{2,12}$/,
                      message:
                        "*한글, 영문, 특수문자를 (- _ .) 포함한 2 ~ 12글자",
                    },
                  })}
                  error={!!errors.nickname}
                  helperText={errors.nickname?.message}
                  InputProps={{
                    sx: { backgroundColor: "#faedcd", borderRadius: "5px" },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className="animate__animated animate__fadeIn animate__delay-0.9s"
                  size="small"
                  fullWidth
                  label="비밀번호"
                  type="password"
                  required
                  {...register("password", {
                    required: true,
                    pattern: {
                      value: /(?=.*[a-zA-ZS])(?=.*?[#?!@$%^&*-]).{6,24}/,
                      message: "*문자와 특수문자 조합의 6~24 자리",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    sx: { backgroundColor: "#faedcd", borderRadius: "5px" },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className="animate__animated animate__fadeIn animate__delay-0.9s"
                  size="small"
                  required
                  fullWidth
                  type="password"
                  label="비밀번호 확인"
                  {...register("checkpw", {
                    required: true,
                    validate: (value) => {
                      if (value !== watch("password")) {
                        return "비밀번호가 같지 않습니다.";
                      }
                      return true;
                    },
                  })}
                  error={!!errors.checkpw}
                  helperText={errors.checkpw?.message}
                  InputProps={{
                    sx: { backgroundColor: "#faedcd", borderRadius: "5px" },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  className="animate__animated animate__fadeIn animate__delay-1.2s"
                  onClick={emailCheck}
                  disabled={idCheck}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  {idCheck ? "아이디 사용가능" : "아이디 중복검사"}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  className="animate__animated animate__fadeIn animate__delay-1.2s"
                  disabled={isLoading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  {isLoading ? <CircularProgress size={24} /> : "Sign up"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
