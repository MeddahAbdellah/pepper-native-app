import * as Updates from 'expo-updates';
import * as SecureStore from 'expo-secure-store';

export enum SecureStoreKeys {
  Error = 'error',
  Token = 'token',
}

export class UtilService {
  public static reloadApp(): void {
    Updates.reloadAsync();
  }

  public static async throwError(error: object): Promise<void> {
    await UtilService.cleanHistory();
    // we need to log error to debug it
    // eslint-disable-next-line no-console
    console.error('Pepper Error: ', error);
    await SecureStore.setItemAsync(SecureStoreKeys.Error, error?.toString());
    UtilService.reloadApp();
  }

  public static async clearErrors(): Promise<void> {
    await SecureStore.deleteItemAsync(SecureStoreKeys.Error);
    UtilService.reloadApp();
  }

  public static async cleanHistory(): Promise<void> {
    Promise.all(Object.keys(SecureStoreKeys).map((key) => SecureStore.deleteItemAsync(key)));
  }
}
