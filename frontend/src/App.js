import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import { Container, ThemeProvider, createTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "./redux/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const theme = createTheme({
    typography: {
      fontFamily: ["omyu_pretty"],
    },
  });
  window.addEventListener("storage", (event) => {
    if (event.key === "token") {
      // 토큰이 변경되면 로그아웃 처리
      dispatch(logout());
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <Container
            maxWidth="1536px"
            sx={{
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "#fefae0",
              display: "flex",
              height: "864px",
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
