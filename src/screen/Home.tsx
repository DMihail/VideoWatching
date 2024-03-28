import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, StatusBar, SectionList} from 'react-native';
import {MainStackProps} from '../navigation/types.ts';
import remoteConfig from '@react-native-firebase/remote-config';
import {Category} from '../rules/types.ts';
import Section from '../component/home/section';
import {COLORS} from '../rules/COLORS.ts';

export default function Home({route}: MainStackProps<'Home'>) {
  const [categories, setCategories] = useState<Array<Category>>([]);
  const fetch = async () => {
    try {
      // await remoteConfig().setDefaults({
      //   is_post_property_enabled: true,
      //   home_page_experiment: false,
      // });
      // await remoteConfig().reset();
      await remoteConfig().setConfigSettings({
        minimumFetchIntervalMillis: 10000,
        fetchTimeMillis: 10000,
      });

      await remoteConfig().fetch(0);
      await remoteConfig().fetchAndActivate();
      const categories = remoteConfig().getValue('categories').asString();
      const parse = JSON.parse(categories);
      setCategories(parse.categories);
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
