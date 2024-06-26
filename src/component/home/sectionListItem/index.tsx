import React, {FC} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {Book} from '../../../rules/types.ts';
import StyledText from '../../StyledText.tsx';
import {COLORS} from '../../../rules/COLORS.ts';

const Section: FC<Book> = props => {
  const {cover, title, isExist, release_date} = props;
  const date = new Date(release_date);
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      disabled={!isExist}
      onPress={() => navigation.navigate('Player', props)}>
      <View>
        <Image
          source={{uri: cover}}
          style={styles.cover}
          resizeMode={'cover'}
          blurRadius={!isExist ? 15 : 0}
        />
        {!isExist && (
          <Image
            source={require('../../../assets/image/Lock.png')}
            style={styles.lock}
          />
        )}
      </View>

      <StyledText style={styles.date} fontWeight={'bold'}>
        coming {date.toLocaleString('en', {month: 'long'})}
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
  lock: {
    width: 48,
    height: 48,
    position: 'absolute',
    alignSelf: 'center',
    top: '35%',
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
    textTransform: 'uppercase',
  },
});
