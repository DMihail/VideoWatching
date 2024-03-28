import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackParamList} from './types';
import Home from '../screen/Home.tsx';
import Player from '../screen/Player.tsx';
import HomeHeader from '../component/home/header/Header.tsx';

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            header: () => <HomeHeader />,
          }}
        />
        <Stack.Screen name="Player" component={Player} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
