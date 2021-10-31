import axios from 'axios';
import client from 'api/client';
import { useQuery } from 'react-query';

// react-query 테스트를 위한 코드
export const postRegister = async (userInfo: {
  email: string;
  password: string;
}): Promise<any> => {
  const { data } = await axios.post(
    'https://cw.malrang.dev/auth/new',
    userInfo,
    { withCredentials: true }
  );
  return data;
};

// export const useRegister = (userInfo: { email: string; password: string }) => {
//   return useQuery(["post", userInfo.email], () => postRegister(userInfo), {
//     enabled: !!userInfo.email,
//   });
// };
