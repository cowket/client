import client from 'api/client';

// 파일 업로드
export const uploadFile = async (file: File): Promise<ImgFile> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await client.post<ImgFile>('/file/upload', formData);
  return response.data;
};
