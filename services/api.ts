// we are using an external library that defies this rules
/* eslint-disable @typescript-eslint/naming-convention */
// any is a valid type as we want to be able to send any object
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// TODO: any is a valid type as we want to be able to send any object
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as SecureStore from 'expo-secure-store';
import { UtilService, SecureStoreKeys } from './util';

enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

const HTTP_OK = 200;

export default class ApiService {
  private static _baseUrl: string = `http://192.168.1.39:7550/api`;

  public static async get(resource: string, params?: any): Promise<any> {
    const queryString = params ? Object.keys(params).map(key => `${key}=${params[key]}`).join('&') : '';
    const headers = await this.getHeaders();
    return fetch(`${this._baseUrl}/${resource}?${queryString}`, { headers })
      .then(this._responseFormatter);
  }

  public static async post(resource: string, body: any, isJson: boolean = true): Promise<any> {
    return this.postLikeRequest(HttpMethod.POST, resource, body, isJson);
  }

  public static async put(resource: string, body: any): Promise<any> {
    return this.postLikeRequest(HttpMethod.PUT, resource, body);

  }

  public static async delete(resource: string, body: any): Promise<any> {
    return this.postLikeRequest(HttpMethod.DELETE, resource, body);
  }

  private static async postLikeRequest(method: HttpMethod, resource: string, body: any, isJson: boolean = true): Promise<any> {
    const headers = await this.getHeaders(isJson);
    const response = await fetch(`${this._baseUrl}/${resource}`, {
      method,
      headers,
      body: isJson ? JSON.stringify(body) : body,
    }
    ).then(this._responseFormatter);
    return response;
  }

  private static async getHeaders(isJson: boolean = true): Promise<any> {
    const authorization = await SecureStore.getItemAsync(SecureStoreKeys.Token).catch(async(error) => UtilService.throwError(error));
    const headers = {
      ...(isJson ? { 'Content-Type': 'application/json; charset=utf-8' } : {}),
      ...( authorization ? { 'Authorization': authorization } : {}),
    };
    return headers;
  }

  public static async setToken(token: string | null): Promise<void> {
    if (!token) {
      await SecureStore.deleteItemAsync(SecureStoreKeys.Token);
      return;
    }
    await SecureStore.setItemAsync(SecureStoreKeys.Token, token).catch(async(error) => UtilService.throwError(error));
  }

  public static async getToken(): Promise<string | null> {
    const token = await SecureStore.getItemAsync(SecureStoreKeys.Token).catch(async(error) => UtilService.throwError(error));
    return token || null;
  }

  private static _responseFormatter(response: any): any {
    if (response.status !== HTTP_OK) {
      throw response;
    }
    return response.json();
  };
}
