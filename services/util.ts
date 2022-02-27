import * as Updates from 'expo-updates';
import * as SecureStore from 'expo-secure-store';

export enum SecureStoreKeys {
  Error = 'error',
  Token = 'token',
  Organizer = 'organizer',
}

export class UtilService {
  public static reloadApp(): void {
    Updates.reloadAsync();
  }

  public static async isOrganizer(): Promise<boolean> {
    const isOrganizer = await SecureStore.getItemAsync(SecureStoreKeys.Organizer);
    return isOrganizer === 'true';
  }

  public static async switchToOrganizer(): Promise<void> {
    await UtilService.cleanHistory();
    await SecureStore.setItemAsync(SecureStoreKeys.Organizer, 'true');
    UtilService.reloadApp();

  }

  public static async switchToUser(): Promise<void> {
    await UtilService.cleanHistory();
    await SecureStore.setItemAsync(SecureStoreKeys.Organizer, 'false');
    UtilService.reloadApp();
  }

  public static async toggleBetweenUserAndOrganizer(): Promise<void> {
    const isOrganizer = await UtilService.isOrganizer();
    if (isOrganizer) {
      await UtilService.switchToUser();
      return;
    }
    await UtilService.switchToOrganizer();
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
    Promise.all(Object.values(SecureStoreKeys).map(async(value) => SecureStore.deleteItemAsync(value)));
  }
}
