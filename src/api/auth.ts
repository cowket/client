import client from 'api/client';
import { AxiosResponse } from 'axios';

export const postRegister = async (userInfo: {
  email: string;
  pw: string;
}): Promise<any> => {
  const response = await client.post<any>('/auth/new', userInfo);

  return response;
};

export const postLogin = async (userInfo: {
  email: string;
  pw: string;
}): Promise<UserDetail> => {
  const response = await client.post<UserDetail>('/auth/login', userInfo);

  return response.data;
};

export const postLoginByToken = async (
  refreshToken: string
): Promise<UserDetail> => {
  const response = await client.post<UserDetail>('/auth/verify', {
    token: refreshToken,
  });

  return response.data;
};
