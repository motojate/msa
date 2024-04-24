import axios from ".";

export const isInUsedUserId = async (dto: { userId: string }) => {
  const response = await axios.get("/auth/active", {
    params: {
      userId: dto.userId,
    },
  });
  return response.data;
};

export const login = async (dto: { userId: string; password: string }) => {
  const response = await axios.post("/auth/login", dto, {
    withCredentials: true,
  });
  return response.data;
};
