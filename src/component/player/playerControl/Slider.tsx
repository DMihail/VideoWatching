import React, {useContext, useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {COLORS} from '../../../rules/COLORS.ts';
import StyledText from '../../StyledText.tsx';
import {RecordContext} from '../videoPlayer';
import {controlPlayerSettings} from '../../../utils/controlPlayerSettings.ts';

const {width} = Dimensions.get('window');

const SLIDER_WIDTH = width - 78;

export default function Slider() {
  const {currentTime, endTime, rewindRecording} = useContext(RecordContext);
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onUpdate(e => {
      if (e.x > 0 && e.x < SLIDER_WIDTH) {
        translateX.value = e.x;
      } else if (e.x < 0) {
        translateX.value = 0;
      } else if (e.x < SLIDER_WIDTH) {
        translateX.value = SLIDER_WIDTH;
      }
    })
    .onEnd(e => {
      rewindRecording(translateX.value / (SLIDER_WIDTH / endTime));
    });

  const scrollTranslationStyle = useAnimatedStyle(() => {
    return {transform: [{translateX: translateX.value}]};
  });

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: translateX.value,
    };
  });

  useEffect(() => {
    if (currentTime && endTime) {
      translateX.value = Math.floor(currentTime * (SLIDER_WIDTH / endTime));
    }
  }, [currentTime, endTime]);

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.sliderView}>
        <View style={styles.slider}>
          <Animated.View style={[styles.progress, progressStyle]} />

          <Animated.View style={[styles.knob, scrollTranslationStyle]} />
        </View>
        <View style={styles.timeContainer}>
          <StyledText fontWeight={'semi-bold'} style={styles.time}>
            {controlPlayerSettings(currentTime)}
          </StyledText>

          <StyledText fontWeight={'semi-bold'} style={styles.time}>
            {controlPlayerSettings(endTime)}
          </StyledText>
        </View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  timeContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  time: {
    fontSize: 11,
    letterSpacing: 0.8,
    color: COLORS.white,
    opacity: 0.8,
  },
  sliderView: {
    marginLeft: 22,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: SLIDER_WIDTH,
    paddingTop: 18,
  },
  slider: {
    height: 3,
    width: SLIDER_WIDTH,
    borderRadius: 7,
    backgroundColor: COLORS.slider,
    justifyContent: 'center',
  },
  progress: {
    backgroundColor: COLORS.white,
    borderRadius: 7,
    height: 3,
    position: 'absolute',
  },
  knob: {
    height: 9,
    width: 9,
    borderRadius: 4.5,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
