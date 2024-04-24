import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  generateVerifyCode,
  signUpUser,
  validateVerifyCode,
} from "../../apis/user";
import useAppSelector from "../../hooks/useAppSelector";
import { isInUsedUserId } from "../../apis/auth";

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

const SignUpUserInputForm = () => {
  const userInfo = useAppSelector((state) => state.userReducer);
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isCheckUserId, setIsCheckUserId] = useState<boolean>(false);

  const signUpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dto = {
      name: userInfo.name,
      birthDate: userInfo.birthDate,
      phoneNumber: userInfo.phoneNumber,
      userId,
      password,
    };
    await signUpUser(dto);
  };

  const checkUserId = async () => {
    const result = await isInUsedUserId({ userId });
    if (result) return window.alert("아이디를 체크해주세요.");
    else return setIsCheckUserId(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Typography component="h1" variant="h5">
          유저 정보 입력
        </Typography>
        <form onSubmit={signUpSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="userName"
            label="이름"
            name="userName"
            value={userInfo.name}
            disabled
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="phoneNumber"
            label="휴대폰번호"
            name="phoneNumber"
            value={userInfo.phoneNumber}
            disabled
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="birthDate"
            label="생년월일"
            name="birthDate"
            value={userInfo.birthDate}
            disabled
          />

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
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="info"
            onClick={checkUserId}
          >
            아이디 체크
          </Button>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="password"
            label="비밀번호"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isCheckUserId}
          >
            회원가입
          </Button>
        </form>
      </ThemeProvider>
    </Container>
  );
};

export default SignUpUserInputForm;
