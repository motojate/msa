import axios from ".";

export const getPostList = async () => {
  const response = await axios.get("/post/", {
    withCredentials: true,
  });
  return response.data;
};

export const login = async (dto: { userId: string; password: string }) => {
  const response = await axios.post("/auth/login", dto, {
    withCredentials: true,
  });
  return response.data;
};
