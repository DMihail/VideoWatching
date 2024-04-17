import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const SLIDER_WIDTH = 300;
const KNOB_WIDTH = 70;
const MAX_RANGE = 20;

function App() {
  const translateX = useSharedValue(0);
  const isSliding = useSharedValue(false);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.offsetX = translateX.value;
    },
    onActive: (event, ctx) => {
      const clamp = (value, lowerBound, upperBound) => {
        return Math.min(Math.max(lowerBound, value), upperBound);
      };

      isSliding.value = true;
      //translateX.value = event.translationX + ctx.offsetX
      translateX.value = clamp(
        event.translationX + ctx.offsetX,
        0,
        SLIDER_WIDTH - KNOB_WIDTH,
      );
    },
    onEnd: () => {
      isSliding.value = false;
    },
  });

  const scrollTranslationStyle = useAnimatedStyle(() => {
    return {transform: [{translateX: translateX.value}]};
  });

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: translateX.value + KNOB_WIDTH,
    };
  });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.slider}>
        {/* <View style={styles.progress} /> */}
        <Animated.View style={[styles.progress, progressStyle]} />
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          {/*  <Animated.View style={styles.knob} /> */}
          <Animated.View style={[styles.knob, scrollTranslationStyle]} />
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  slider: {
    height: KNOB_WIDTH,
    width: SLIDER_WIDTH,
    borderRadius: KNOB_WIDTH / 2,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    ...shadowStyle,
  },
  progress: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#3f51b5',
    borderRadius: KNOB_WIDTH / 2,
  },
  knob: {
    height: KNOB_WIDTH,
    width: KNOB_WIDTH,
    borderRadius: KNOB_WIDTH / 2,
    backgroundColor: '#757de8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export const shadowStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.5,
  elevation: 5,
};
export const clamp = (value, lowerBound, upperBound) => {
  'worklet';
  return Math.min(Math.max(lowerBound, value), upperBound);
};
