import remoteConfig from '@react-native-firebase/remote-config';

export const initConfig = async () => {
  await remoteConfig().setConfigSettings({
    minimumFetchIntervalMillis: 10000,
    fetchTimeMillis: 10000,
  });

  await remoteConfig().fetch(0);
  await remoteConfig().fetchAndActivate();
};

export const getRemoteValue = async (param: string) => {
  const value = await remoteConfig().getValue(param).asString();
  return JSON.parse(value);
};

export const resetConfig = async () => {
  await remoteConfig().reset();
};
