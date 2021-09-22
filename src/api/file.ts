import client from 'api/client';

// 파일 업로드
export const uploadFile = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await client.post<any>('/file/upload', formData);
  console.log(response);
  return response.data;
};
