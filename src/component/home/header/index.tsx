import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import StyledText from '../../StyledText.tsx';
import SearchSvg from '../../../assets/svg/SearchSvg.tsx';
import {COLORS} from '../../../rules/COLORS.ts';

const gift = require('../../../assets/image/gift.png');
export default function HomeHeader() {
  return (
    <View style={styles.container}>
      <StyledText style={styles.title} fontWeight={'bold'}>
        Home
      </StyledText>

      <View style={styles.iconBox}>
        <TouchableOpacity>
          <Image source={gift} />
        </TouchableOpacity>
        <TouchableOpacity>
          <SearchSvg />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  title: {
    fontSize: 20,
    letterSpacing: -0.5,
    color: COLORS.white,
  },
  iconBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});
