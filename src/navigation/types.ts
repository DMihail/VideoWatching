import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Book} from '../rules/types.ts';

export type MainStackParamList = {
  Home: undefined;
  Player: Book;
};

export type MainStackProps<Screen extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, Screen>;
