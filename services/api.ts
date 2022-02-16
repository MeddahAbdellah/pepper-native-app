// we are using an external library that defies this rules
/* eslint-disable @typescript-eslint/naming-convention */
// any is a valid type as we want to be able to send any object
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// TODO: any is a valid type as we want to be able to send any object
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as SecureStore from 'expo-secure-store';
import { UtilService } from './util';

export const secureStoryTokenKey = 'token';

enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

const HTTP_OK = 200;

export default class ApiService {
  private static _baseUrl: string = `http://localhost:7550/api`;

  public static async get(resource: string, params?: any, errorHandler?: (error: any) => void): Promise<any> {
    const queryString = params ? Object.keys(params).map(key => `${key}=${params[key]}`).join('&') : '';
    const headers = await this.getHeaders();
    return fetch(`${this._baseUrl}/${resource}?${queryString}`, { headers })
      .then(this._responseHandler)
      .catch(errorHandler ? errorHandler : this._errorHandler);
  }

  public static async post(resource: string, body: any, errorHandler?: (error: any) => void): Promise<any> {
    return this.postLikeRequest(HttpMethod.POST, resource, body, errorHandler);
  }

  public static async put(resource: string, body: any, errorHandler?: (error: any) => void): Promise<any> {
    return this.postLikeRequest(HttpMethod.PUT, resource, body, errorHandler);

  }

  public static async delete(resource: string, body: any, errorHandler?: (error: any) => void): Promise<any> {
    return this.postLikeRequest(HttpMethod.DELETE, resource, body, errorHandler);
  }

  private static async postLikeRequest(method: HttpMethod, resource: string, body: any, errorHandler?: (error: any) => void): Promise<any> {
    const headers = await this.getHeaders();
    const response = await fetch(`${this._baseUrl}/${resource}`, {
      method,
      headers,
      body: JSON.stringify(body),
    }
    )
      .then(this._responseHandler)
      .catch(errorHandler ? errorHandler : this._errorHandler);
    return response;
  }

  private static async getHeaders(): Promise<any> {
    const authorization = await SecureStore.getItemAsync(secureStoryTokenKey).catch(this._errorHandler);;
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      ...( authorization ? { 'Authorization': authorization } : {}),
    };
    return headers;
  }

  public static async setToken(token: string | null): Promise<void> {
    if (!token) {
      await SecureStore.deleteItemAsync(secureStoryTokenKey);
      return;
    }
    await SecureStore.setItemAsync(secureStoryTokenKey, token).catch(this._errorHandler);
  }

  public static async getToken(): Promise<string | null> {
    const token = await SecureStore.getItemAsync(secureStoryTokenKey).catch(this._errorHandler);
    return token || null;
  }

  private static async _errorHandler(error: any): Promise<void> {
    await UtilService.throwError(error);
  }

  private static _responseHandler(response: any): any {
    if (response.status !== HTTP_OK) {
      throw JSON.stringify(response);
    }
    return response.json();
  };
}
