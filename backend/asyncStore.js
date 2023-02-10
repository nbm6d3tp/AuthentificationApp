import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = value => {
  console.log(value);
  AsyncStorage.setItem('idToken', value);
};
