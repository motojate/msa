import axios from ".";

export const generateVerifyCode = async (dto: {
  name: string;
  birthDate: string;
  phoneNumber: string;
}) => {
  try {
    const response = await axios.post("/user/generate-verify-code", dto);
    return response.data;
  } catch (e) {}
};

export const validateVerifyCode = async (dto: {
  phoneNumber: string;
  verifyCode: string;
}) => {
  try {
    const response = await axios.post("/user/validate-verify-code", dto);
    return response.data;
  } catch (e) {}
};

export const signUpUser = async (dto: {
  name: string;
  birthDate: string;
  phoneNumber: string;
  userId: string;
  password: string;
}) => {
  try {
    const response = await axios.post("/user/create-user", dto);
    return response.data;
  } catch (e) {}
};

export const isCheckUserLogin = async () => {
  const response = await axios.get("/cookie-check", {
    withCredentials: true,
  });
  return response.data;
};
