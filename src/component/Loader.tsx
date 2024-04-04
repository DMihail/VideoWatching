import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {COLORS} from '../rules/COLORS.ts';
export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={COLORS.white} size={'large'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.transparent,
  },
});
