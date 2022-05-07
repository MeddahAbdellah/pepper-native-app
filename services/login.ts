import ApiService from './api';
import { UtilService } from './util';
import { Gender } from '../models/types';

export default class LoginService {
  public static async login(phoneNumber: string, code: string): Promise<boolean> {
    const loginPath = await this.getLoginPath();
    const { token } = await ApiService.post(loginPath, { phoneNumber, code });
    if (token) {
      await ApiService.setToken(token).catch(this._errorHandler);
      return true;
    }
    return false;
  }

  public static async subscribe(
    phoneNumber: string,
    code: string,
    name: string,
    gender: Gender,
    address: string,
    description: string,
    interests: string[],
    job: string,
    imgs: Array<{ uri: string}>,
    facebook?: string,
    instagram?: string,
    snapchat?: string,
  ): Promise<boolean> {
    const loginPath = await this.getLoginPath();
    const { token } = await ApiService.put(loginPath, {
      phoneNumber,
      code,
      name,
      gender,
      address,
      description,
      interests,
      job,
      imgs,
      facebook,
      instagram,
      snapchat,
    });
    if (token) {
      await ApiService.setToken(token).catch(this._errorHandler);
      return true;
    }
    return false;
  }

  public static async logout(): Promise<void> {
    await UtilService.cleanHistory();
    UtilService.reloadApp();
  }

  public static async isLoggedin(): Promise<boolean> {
    const currentToken = await ApiService.getToken().catch(this._errorHandler);
    return !!currentToken;
  }

  public static async isSubscribedAndInitLogin(phoneNumber: string): Promise<boolean> {
    const loginPath = await this.getLoginPath();
    const { userExists } = await ApiService.get(loginPath, { phoneNumber }).catch(this._errorHandler);
    return userExists;
  }

  private static async getLoginPath(): Promise<string> {
    const isOrganizer = await UtilService.isOrganizer();
    return isOrganizer ? 'organizer/login' : 'user/login';
  }

  // any is a valid type as we want to be able to send any object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static async _errorHandler(error: any): Promise<void> {
    await UtilService.throwError(error);
  }
}
