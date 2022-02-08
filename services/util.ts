import * as Updates from 'expo-updates';

export class UtilService {
  public static reloadApp(): void {
    Updates.reloadAsync();
  }
}