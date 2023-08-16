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
import { useEffect } from "react";
import SignupAxios from "../../api/auth/Post/SignupAxios";
import IdcheckAxios from "../../api/auth/Post/IdcheckAxios";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(0);
  const [idCheck, setIdCheck] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const emailCheck = async () => {
    const res = await IdcheckAxios(watch("email"));
    if (res.data === false) {
      setIdCheck(true);
      setOpen(2);
    } else {
      setOpen(4);
    }
  };

  const onSubmit = (data) => {
    if (idCheck === false) {
      setOpen(3);
    } else {
      setIsLoading(true);
      SignupAxios(data);

      setTimeout(() => {
        setIsLoading(false);
        setOpen(1);
      }, 2000); // 2초 후에 프로그레스 바가 사라짐

      setTimeout(() => {
        window.location.reload();
      }, 3000); // 3초 후에 로그인 페이지로 이동
    }
  };

  useEffect(() => {
    setIdCheck(false);
  }, [watch("email")]);

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
            open={open === 1 || open === 2 || open === 3 || open === 4}
            autoHideDuration={4000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={() => setOpen(0)} // Snackbar 닫기 이벤트 처리
          >
            <Alert
              severity={
                open === 1 ? "success" : open === 2 ? "success" : "error"
              }
              sx={{ width: "100%" }}
            >
              {open === 1 &&
                "회원가입이 완료되었습니다. 로그인 페이지로 이동합니다."}
              {open === 2 && "사용가능한 이메일입니다."}
              {open === 3 && "이메일 중복검사를 해주세요."}
              {open === 4 && "이미 사용중인 이메일입니다."}
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
                  color="success"
                  autoFocus
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "*이메일형식이 아닙니다.",
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
                  color="success"
                  label="이름"
                  {...register("nickname", {
                    required: true,
                    pattern: {
                      value: /^(?:[가-힣]{2,8}|[a-zA-Z]{2,12})$/,
                      message: "*한글 2 ~ 8자, 영문 2 ~ 12글자",
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
                  label="비밀번호"
                  type="password"
                  color="success"
                  required
                  {...register("password", {
                    required: true,
                    pattern: {
                      value:
                        /^(?=.*[a-zA-Z])(?=.*[!@#$%^+=-])(?=.*[0-9]).{8,15}$/,
                      message:
                        "*영문,숫자,특수기호를 포함한 8자리 이상, 15자리 이하",
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
                  type="password"
                  color="success"
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
                  color="inherit"
                  sx={{ mt: 2, backgroundColor: "#faedcd", color: "black" }}
                >
                  {idCheck ? "이메일 사용가능" : "이메일 중복검사"}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  className="animate__animated animate__fadeIn animate__delay-1.2s"
                  disabled={isLoading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="inherit"
                  sx={{ mt: 2, backgroundColor: "#faedcd", color: "black" }}
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
