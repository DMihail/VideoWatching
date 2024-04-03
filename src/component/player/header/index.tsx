import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import StyledText from '../../StyledText.tsx';
import {COLORS} from '../../../rules/COLORS.ts';
import CloseSvg from '../../../assets/svg/CloseSvg.tsx';

type Props = {
  title: string;
  back: () => void;
};

export default function PlayerHeader({title, back}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={back} style={styles.close}>
        <CloseSvg />
      </TouchableOpacity>
      <StyledText style={styles.title} fontWeight={'bold'}>
        {title}
      </StyledText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.transparent,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    // width: '100%',
  },
  title: {
    fontSize: 20,
    letterSpacing: -0.5,
    color: COLORS.white,
  },
  close: {
    marginLeft: 16,
    position: 'absolute',
    left: 16,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
