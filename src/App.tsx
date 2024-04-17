import React from 'react';
import {Button, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
// @ts-ignore
import NativeDevSettings from 'react-native/Libraries/NativeModules/specs/NativeDevSettings';
import {persist, store} from './redux';
import Navigation from './navigation';
import {COLORS} from './rules/COLORS.ts';
import Slider from './component/player/slider';

function App(): React.JSX.Element {
  const connectToRemoteDebugger = () => {
    NativeDevSettings.setIsDebuggingRemotely(true);
  };

  //   return (
  //     <Provider store={store}>
  //       <PersistGate loading={null} persistor={persist}>
  //         <SafeAreaProvider initialMetrics={initialWindowMetrics}>
  //           <StatusBar backgroundColor={COLORS.black} />
  //           {/*{__DEV__ && (*/}
  //           {/*  <Button title={'Debug'} onPress={connectToRemoteDebugger} />*/}
  //           {/*)}*/}
  //           <Navigation />
  //         </SafeAreaProvider>
  //       </PersistGate>
  //     </Provider>
  //   );
  // }

  return (
    <View style={styles.container}>
      <View style={styles.container} />
      <Slider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
});
export default App;
