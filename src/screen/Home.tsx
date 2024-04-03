import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, StatusBar, SectionList} from 'react-native';
import {MainStackProps} from '../navigation/types.ts';
import {Category} from '../rules/types.ts';
import Section from '../component/home/section';
import {COLORS} from '../rules/COLORS.ts';
import {getRemoteValue} from '../utils/removeConfig.ts';

export default function Home({route}: MainStackProps<'Home'>) {
  const [categories, setCategories] = useState<Array<Category>>([]);
  const fetch = async () => {
    try {
      const data = await getRemoteValue('categories');
      console.log(data.categories);
      setCategories(data.categories);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={categories}
        keyExtractor={item => item.title}
        renderItem={() => {
          return null;
        }}
        renderSectionHeader={({section: {title, data}}) => (
          <Section title={title} data={data} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: COLORS.black,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 32,
    color: COLORS.white,
  },
});
