import client from 'api/client';

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
}): Promise<any> => {
  const response = await client.post<any>('/auth/login', userInfo);

  return response;
};

export const postLoginByToken = async (refreshToken: string): Promise<any> => {
  const response = await client.post<any>('/auth/verify', {
    token: refreshToken,
  });

  return response;
};
