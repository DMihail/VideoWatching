import React, {FC} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import PauseSvg from '../../../assets/svg/PauseSvg.tsx';
import Slider from './Slider.tsx';
import ContinueSvg from '../../../assets/svg/ContinueSvg.tsx';
const {width} = Dimensions.get('window');

type PlayerControlProps = {
  isPlay: boolean;
  play: () => void;
};

const PlayerControl: FC<PlayerControlProps> = ({isPlay, play}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.pause} onPress={play}>
        {isPlay ? <PauseSvg /> : <ContinueSvg width={18} height={18} />}
      </TouchableOpacity>
      <Slider />
    </View>
  );
};

export default PlayerControl;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: width - 32,
    marginHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  pause: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
