import React from 'react';
import {StatusBar} from 'react-native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {persist, store} from './redux';
import Navigation from './navigation';
import {COLORS} from './rules/COLORS.ts';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <StatusBar backgroundColor={COLORS.black} />
          <Navigation />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
