import React, {FC} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Category} from '../../../rules/types.ts';
import StyledText from '../../StyledText.tsx';
import SectionListItem from '../sectionListItem';
import {COLORS} from '../../../rules/COLORS.ts';

const Section: FC<Category> = ({title, data}) => {
  return (
    <View style={styles.container}>
      <StyledText style={styles.header} fontWeight={'bold'}>
        {title}
      </StyledText>
      <FlatList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        renderItem={({item}) => <SectionListItem {...item} />}
        contentContainerStyle={styles.list}
        indicatorStyle={'white'}
      />
    </View>
  );
};

export default Section;

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  header: {
    fontSize: 32,
    color: COLORS.white,
    marginBottom: 16,
  },
  list: {
    gap: 12,
  },
});
