import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { generateVerifyCode, validateVerifyCode } from "../../apis/user";
import useAppDispatch from "../../hooks/useAppDispatch";
import { goNextStep, setUserInfo } from "../../stores/userSlice";

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

const PhoneNumberVerifyForm = () => {
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [verifyCode, setVerifyCode] = useState<string>("");

  const submitPhoneNumber = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dto = {
      name: userName,
      birthDate,
      phoneNumber,
    };
    const data = await generateVerifyCode(dto);
    if (data === true) return setIsSubmit(true);
    else window.alert("오류 발생");
  };

  const submitVerifyCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dto = {
      verifyCode,
      phoneNumber,
    };
    const data = await validateVerifyCode(dto);
    if (data === true) {
      const userInfoDto = {
        name: userName,
        birthDate,
        phoneNumber,
      };
      dispatch(setUserInfo(userInfoDto));
      return dispatch(goNextStep());
    } else window.alert("다시 확인해주세요.");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Typography component="h1" variant="h5">
          휴대폰 인증
        </Typography>
        <form onSubmit={submitPhoneNumber}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="userName"
            label="이름"
            name="userName"
            autoFocus
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="birthDate"
            label="생년월일"
            id="birthDate"
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="phoneNumber"
            label="휴대폰번호"
            id="phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={!!isSubmit}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={!!isSubmit}
          >
            인증번호 생성
          </Button>
        </form>
        {isSubmit && (
          <form onSubmit={submitVerifyCode}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="verifyCode"
              label="인증번호"
              id="verifyCode"
              onChange={(e) => setVerifyCode(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              인증하기
            </Button>
          </form>
        )}
      </ThemeProvider>
    </Container>
  );
};

export default PhoneNumberVerifyForm;
