import { createSlice } from "@reduxjs/toolkit";

interface UserInitialState {
  phoneNumber: string;
  name: string;
  birthDate: string;
  step: number;
}

const initialState: UserInitialState = {
  phoneNumber: "",
  name: "",
  birthDate: "",
  step: 1,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    goNextStep: (state) => {
      state.step += 1;
    },
    setUserInfo: (state, action) => {
      state.name = action.payload.name;
      state.birthDate = action.payload.birthDate;
      state.phoneNumber = action.payload.phoneNumber;
    },
  },
});

export const { goNextStep, setUserInfo } = userSlice.actions;
export default userSlice;
