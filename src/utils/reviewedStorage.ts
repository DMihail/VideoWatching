import AsyncStorage from '@react-native-async-storage/async-storage';

export const setReviewed = async (
  key: string,
  value: string,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    if (__DEV__) {
      console.log(e);
    }
  }
};

export const getReviewed = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    if (__DEV__) {
      console.log(e);
    }
    return null;
  }
};
