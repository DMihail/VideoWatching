import React, {FC} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Category} from '../../../rules/types.ts';
import StyledText from '../../StyledText.tsx';
import SectionListItem from '../sectionListItem';
import {COLORS} from '../../../rules/COLORS.ts';
import Recommendation from '../recommendation';

type Props = {
  isRecommendation: boolean;
};

const Section: FC<Category & Props> = ({title, data, isRecommendation}) => {
  return (
    <View style={styles.container}>
      {!isRecommendation && (
        <StyledText style={styles.header} fontWeight={'bold'}>
          {title}
        </StyledText>
      )}
      <FlatList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        renderItem={({item}) =>
          !isRecommendation ? (
            <SectionListItem {...item} />
          ) : (
            <Recommendation {...item} />
          )
        }
        contentContainerStyle={styles.list}
        indicatorStyle={'black'}
      />
    </View>
  );
};

export default Section;

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
    marginHorizontal: 16,
  },
  header: {
    fontSize: 20,
    color: COLORS.white,
    marginBottom: 16,
  },
  list: {
    gap: 12,
  },
});
