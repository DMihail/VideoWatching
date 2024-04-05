import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';
import {useSelector} from 'react-redux';
import Section from '../component/home/section';
import {COLORS} from '../rules/COLORS.ts';
import {ReduxStoreState, SagaHelper} from '../redux';
import {Category} from '../rules/types.ts';
import Loader from '../component/Loader.tsx';
import ContinueWatching from '../component/home/continueWatching';

export default function Home() {
  const isInit = useSelector((state: ReduxStoreState) => state.isInit);
  const content = useSelector(
    (state: ReduxStoreState) => state.content,
  ).toJS() as Array<Category>;
  const [load, setLoad] = useState<boolean>(true);

  const fetch = async () => {
    setLoad(true);
    await SagaHelper.run(['content', 'getContent']);
    setLoad(false);
  };
  useEffect(() => {
    if (isInit) fetch();
  }, [isInit]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        indicatorStyle={'white'}>
        {load ? (
          <Loader />
        ) : (
          content.map(item => (
            <View key={item.title}>
              <Section
                title={item.title}
                data={item.data}
                isRecommendation={item.title === 'recommendation'}
              />
              {item.title === 'recommendation' && <ContinueWatching />}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  scroll: {
    flexGrow: 1,
  },
});
