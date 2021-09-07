import type { NextApiRequest, NextApiResponse } from "next";
import client from "pages/api/client";

export const postRegister = async (userInfo: {
  email: string;
  pw: string;
}): Promise<any> => {
  const response = await client.post<NextApiResponse<any>>(
    "https://cowket-api.stackunderflow.xyz/auth/new",
    userInfo
  );

  return response;
};
