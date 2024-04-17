import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackParamList} from './types';
import Home from '../screen/Home.tsx';
import Player from '../screen/Player.tsx';
import HomeHeader from '../component/home/header';
import {initConfig} from '../utils/removeConfig.ts';

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function RootNavigator() {
  useEffect(() => {
    initConfig();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Player'}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            header: () => <HomeHeader />,
          }}
        />
        <Stack.Screen
          name="Player"
          component={Player}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
