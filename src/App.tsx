import React from 'react';
import {Button, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
// @ts-ignore
import NativeDevSettings from 'react-native/Libraries/NativeModules/specs/NativeDevSettings';
import {persist, store} from './redux';
import Navigation from './navigation';
import {COLORS} from './rules/COLORS.ts';

function App(): React.JSX.Element {
  const connectToRemoteDebugger = () => {
    NativeDevSettings.setIsDebuggingRemotely(true);
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <SafeAreaProvider>
          <StatusBar backgroundColor={COLORS.black} />
          {__DEV__ && (
            <Button title={'Debug'} onPress={connectToRemoteDebugger} />
          )}
          <Navigation />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
