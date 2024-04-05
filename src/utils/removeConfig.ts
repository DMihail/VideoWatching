import remoteConfig from '@react-native-firebase/remote-config';
import {ReduxHelper} from '../redux';

export const initConfig = async () => {
  try {
    await remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 10000,
      fetchTimeMillis: 10000,
    });

    await remoteConfig().fetch(0);
    await remoteConfig().fetchAndActivate();
    ReduxHelper.setIn(['isInit'], true);
  } catch (e) {
    if (__DEV__) {
      console.log(e);
    }
  }
};

export const getRemoteValue = async (param: string) => {
  const value = await remoteConfig().getValue(param).asString();
  return JSON.parse(value);
};

export const resetConfig = async () => {
  await remoteConfig().reset();
};
