import client from "api/client";

export const postRegister = async (userInfo: {
  email: string;
  pw: string;
}): Promise<any> => {
  const response = await client.post<any>("/auth/new", userInfo);

  return response;
};

export const postLogin = async (userInfo: {
  email: string;
  pw: string;
}): Promise<any> => {
  const response = await client.post<any>("/auth/login", userInfo);

  return response;
};
