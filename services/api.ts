// we are using an external library that defies this rules
/* eslint-disable @typescript-eslint/naming-convention */
// any is a valid type as we want to be able to send any object
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as SecureStore from 'expo-secure-store';

export const secureStoryTokenKey = 'token';

enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export default class ApiService {
  private static _baseUrl: string = `http://192.168.1.39:7550/api`;
  

  public static async get(resource: string, params?: any): Promise<any> {
    const queryString = params ? Object.keys(params).map(key => `${key}=${params[key]}`).join('&') : '';
    const headers = await this.getHeaders();
    return fetch(`${this._baseUrl}/${resource}?${queryString}`, { headers }).then((res) => res.json()).catch(this.errorHandler);
  }

  public static async post(resource: string, body: any): Promise<any> {
    return this.postLikeRequest(HttpMethod.POST, resource, body);
  }

  public static async put(resource: string, body: any): Promise<any> {
    return this.postLikeRequest(HttpMethod.PUT, resource, body);

  }

  public static async delete(resource: string, body: any): Promise<any> {
    return this.postLikeRequest(HttpMethod.DELETE, resource, body);
  }

  private static async postLikeRequest(method: HttpMethod, resource: string, body: any): Promise<any> {
    const headers = await this.getHeaders();
    const response = await fetch(`${this._baseUrl}/${resource}`, {
      method,
      headers,
      body: JSON.stringify(body),
    }
    ).then((res) => res.json()).catch(this.errorHandler);
    return response;
  }

  private static async getHeaders(): Promise<any> {
    const authorization = await SecureStore.getItemAsync(secureStoryTokenKey);
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      ...( authorization ? { 'Authorization' : authorization } : {}),
    };
    return headers;
  }

  public static async setToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(secureStoryTokenKey, token);
  }

  public static async getToken(): Promise<string | null> {
    return SecureStore.getItemAsync(secureStoryTokenKey);
  }

  private static errorHandler(error: any): void {
    console.error('HTTP Request error', error);
  }
}