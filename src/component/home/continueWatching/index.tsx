import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {COLORS} from '../../../rules/COLORS.ts';
import {ReduxStoreState} from '../../../redux';
import StyledText from '../../StyledText.tsx';
import RightArrowSvg from '../../../assets/svg/RightArrowSvg.tsx';

export default function ContinueWatching() {
  const lastBook = useSelector((state: ReduxStoreState) => state.lastBook);
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  return lastBook ? (
    <View>
      <StyledText style={styles.header} fontWeight={'bold'}>
        Continue Watching
      </StyledText>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('Player', lastBook.toJS())}>
        <View style={styles.row}>
          <Image src={lastBook.cover} style={styles.image} />
          <View>
            <StyledText style={styles.title} fontWeight={'bold'}>
              {lastBook.title}
            </StyledText>
            <StyledText style={styles.subtitle} fontWeight={'regular'}>
              {lastBook.author}
            </StyledText>
          </View>
        </View>

        <View>
          <RightArrowSvg />
        </View>
      </TouchableOpacity>
    </View>
  ) : (
    <View />
  );
}

const styles = StyleSheet.create({
  view: {
    marginHorizontal: 16,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    backgroundColor: COLORS.darkBlue,
    paddingVertical: 6,
    paddingLeft: 6,
    paddingRight: 16,
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    color: COLORS.white,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 18,
  },
  image: {
    width: 44,
    height: 56,
    marginRight: 12,
    borderRadius: 7,
  },
});
