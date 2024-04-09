import React, {FC} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import StyledText from '../../StyledText.tsx';
import {Book} from '../../../rules/types.ts';
import {COLORS} from '../../../rules/COLORS.ts';

const Recommendation: FC<Book> = props => {
  const {cover, title, type, author, isExist} = props;
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      disabled={!isExist}
      onPress={() => navigation.navigate('Player', props)}>
      <ImageBackground src={cover} style={styles.cover} resizeMode={'cover'}>
        <View style={styles.typeShell}>
          <StyledText style={styles.type} fontWeight={'bold'}>
            {type}
          </StyledText>
        </View>

        <View>
          <StyledText style={styles.title} fontWeight={'bold'}>
            {title}
          </StyledText>
          <StyledText style={styles.subTitle} fontWeight={'regular'}>
            {author}
          </StyledText>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Recommendation;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  cover: {
    height: 216,
    width: width - 44,
    paddingVertical: 16,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  type: {
    fontSize: 11,
    color: COLORS.white,
    padding: 6,
    backgroundColor: COLORS.black,
    borderRadius: 7,
    textTransform: 'uppercase',
    overflow: 'hidden',
  },
  typeShell: {
    alignItems: 'baseline',
  },
  title: {
    fontSize: 28,
    color: COLORS.white,
  },
  subTitle: {
    fontSize: 16,
    color: COLORS.white,
  },
});
