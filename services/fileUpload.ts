import ApiService from './api';

export default class FileUploadService {
  public static async uploadImage(base64: string): Promise<{ uri: string }> {
    const formData = new FormData();
    formData.append('img', base64);
    return ApiService.post('/proxy/s3', formData, false);
  }
}
