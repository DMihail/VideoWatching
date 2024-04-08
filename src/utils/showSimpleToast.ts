import Toast from 'react-native-simple-toast';

export default function (message = 'Not implemented') {
  Toast.showWithGravity(message, Toast.SHORT, Toast.TOP);
}
