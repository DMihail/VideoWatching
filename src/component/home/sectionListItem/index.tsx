import React, {FC} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Movie} from '../../../rules/types.ts';
import StyledText from '../../StyledText.tsx';
import {COLORS} from '../../../rules/COLORS.ts';

const Section: FC<Movie> = ({id, cover, title, isExist, release_date}) => {
  return (
    <TouchableOpacity style={styles.container} disabled={!isExist}>
      <Image source={{uri: cover}} style={styles.cover} resizeMode={'cover'} />
      <StyledText style={styles.date} fontWeight={'bold'}>
        {release_date}
      </StyledText>
      <StyledText style={styles.title} fontWeight={'semi-bold'}>
        {title}
      </StyledText>
    </TouchableOpacity>
  );
};

export default Section;

const styles = StyleSheet.create({
  container: {
    width: 120,
  },
  cover: {
    height: 150,
    borderRadius: 7,
  },
  title: {
    fontSize: 14,
    textAlign: 'left',
    color: COLORS.white,
    marginTop: 8,
  },
  date: {
    fontSize: 11,
    textAlign: 'left',
    color: COLORS.blue,
    marginTop: 8,
  },
});
