import ApiService from "./api";
import * as SecureStore from 'expo-secure-store';
import { UtilService } from "./util";

export default class LoginService {
  public static async login(phoneNumber: string, code: string): Promise<void> {
    const { token } = await ApiService.post('user/login', { phoneNumber, code });
    await ApiService.setToken(token).catch(this._errorHandler);
  }
  public static async logout(): Promise<void> {
    await ApiService.setToken(null).catch(this._errorHandler);
  }

  public static async isLoggedin(): Promise<boolean> {
    const currentToken = await ApiService.getToken().catch(this._errorHandler);
    return !!currentToken;
  }
  
  private static async _errorHandler(error: any): Promise<void> {
    const oldError = await SecureStore.getItemAsync('error');
    if (oldError) { return; }
    await SecureStore.setItemAsync('error', error.toString());
    UtilService.reloadApp();
  }
}
