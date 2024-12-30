import AsyncStorage from "@react-native-async-storage/async-storage";

export const AsyncStorageUtil = {
  setData: async <T>(key: string, value: T) => {
    const valueString = JSON.stringify(value);
    await AsyncStorage.setItem(key, valueString);
  },
  getData: async <T>(key: string) => {
    const valueString = await AsyncStorage.getItem(key);
    if (valueString) {
      const value = JSON.parse(valueString);
      return value as T;
    }
    return undefined;
  },
  removeData: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
};
