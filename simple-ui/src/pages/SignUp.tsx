import "../App.css";
import PhoneNumberVerifyForm from "../components/sign-up/PhoneNumberVerifyForm";
import SignUpUserInputForm from "../components/sign-up/SignUpUserInputForm";
import useAppSelector from "../hooks/useAppSelector";

const SignUp = () => {
  const step = useAppSelector((state) => state.userReducer.step);
  return (
    <div className="App">
      {step === 1 && <PhoneNumberVerifyForm />}
      {step === 2 && <SignUpUserInputForm />}
    </div>
  );
};

export default SignUp;
