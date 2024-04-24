import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login } from "../../apis/auth";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9575cd",
    },
    background: {
      default: "#f3e5f5",
    },
  },
  typography: {
    fontFamily: '"Comic Sans MS", cursive, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: "10px 20px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          marginBottom: "10px",
        },
      },
    },
  },
});

const LoginForm = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dto = {
      userId,
      password,
    };
    await login(dto);
    navigate("/post", { replace: true });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <form onSubmit={loginSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="userId"
            label="아이디"
            name="userId"
            autoFocus
            onChange={(e) => setUserId(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="password"
            label="비밀번호"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            로그인
          </Button>
        </form>
      </ThemeProvider>
    </Container>
  );
};

export default LoginForm;
