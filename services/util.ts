import * as Updates from 'expo-updates';
import * as SecureStore from 'expo-secure-store';

export class UtilService {
  public static reloadApp(): void {
    Updates.reloadAsync();
  }

  public static async throwError(error: object): Promise<void> {
    // we need to log error to debug it
    // eslint-disable-next-line no-console
    console.error('Pepper Error: ', error);
    const oldError = await SecureStore.getItemAsync('error');
    if (oldError) { return; }
    await SecureStore.setItemAsync('error', error?.toString());
    UtilService.reloadApp();
  }

  public static async clearErrors(): Promise<void> {
    await SecureStore.deleteItemAsync('error');
    UtilService.reloadApp();
  }
}
