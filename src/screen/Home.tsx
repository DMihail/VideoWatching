import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  SectionList,
  View,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import Section from '../component/home/section';
import {COLORS} from '../rules/COLORS.ts';
import {ReduxStoreState, SagaHelper} from '../redux';
import {Category} from '../rules/types.ts';

export default function Home() {
  const isInit = useSelector((state: ReduxStoreState) => state.isInit);
  const content: Array<Category> = useSelector(
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
      {load ? (
        <View style={styles.loadView}>
          <ActivityIndicator color={COLORS.white} size={'large'} />
        </View>
      ) : (
        <SectionList
          sections={content}
          keyExtractor={item => item.id}
          renderItem={() => {
            return null;
          }}
          renderSectionHeader={({section: {title, data}}) => (
            <Section
              title={title}
              data={data}
              isRecommendation={title === 'recommendation'}
            />
          )}
        />
      )}
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
  loadView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.transparent,
  },
});
