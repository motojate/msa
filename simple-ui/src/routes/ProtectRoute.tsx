import { useEffect, useState } from "react";
import { isCheckUserLogin } from "../apis/user";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";

const ProtectRoute = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await isCheckUserLogin();
      setIsLogin(result);
    };
    fetchData();
  }, []);

  return isLogin ? <Outlet /> : <Login />;
};

export default ProtectRoute;
