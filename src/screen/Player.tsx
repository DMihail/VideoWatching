import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {MainStackProps} from '../navigation/types.ts';
import PlayerHeader from '../component/player/header';
import {COLORS} from '../rules/COLORS.ts';
import VideoPlayer, {VideoPlayerProps} from '../component/player/videoPlayer';
import {ReduxHelper, SagaHelper} from '../redux';
import Loader from '../component/Loader.tsx';
import {getReviewed, setReviewed} from '../utils/reviewedStorage.ts';

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 40,
  waitForInteraction: true,
};

type Episode = Omit<VideoPlayerProps, 'current'>;

export default function Player({route, navigation}: MainStackProps<'Player'>) {
  const flatListRef = useRef<FlatList>(null);
  const {id} = route.params;
  const [load, setLoad] = useState<boolean>(true);
  const [episodes, setEpisodes] = useState<Array<Episode>>([]);
  const [currentEpisode, setCurrentEpisode] = useState<Episode>(episodes[0]);

  const onViewableItemsChanged = useCallback(async ({viewableItems}) => {
    if (viewableItems.length === 1) {
      setCurrentEpisode(viewableItems[0].item);
      await setReviewed(`${id}book`, viewableItems[0].index.toString());
    }
  }, []);

  const getBook = async () => {
    try {
      const episodes: Array<Episode> = await SagaHelper.run(
        ['content', 'getCurrentBook'],
        id,
      );
      const currentPart = await getReviewed(`${id}book`);
      console.log(currentPart);
      if (episodes && route.params) {
        setEpisodes(episodes);
        ReduxHelper.setIn(['lastBook'], route.params);
        if (currentPart !== null) {
          setCurrentEpisode(episodes[+currentPart]);
          flatListRef.current?.scrollToIndex({index: +currentPart});
        } else {
          setCurrentEpisode(episodes[0]);
        }
      }
    } catch (e) {
      if (__DEV__) {
        console.log(e);
      }
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {load ? (
        <Loader />
      ) : (
        <LinearGradient
          colors={[COLORS.black, COLORS.white, COLORS.black]}
          locations={[0.1, 0.5, 1]}
          style={styles.container}>
          <PlayerHeader
            title={currentEpisode.title}
            back={() => navigation.goBack()}
          />
          <FlatList
            ref={flatListRef}
            pagingEnabled={true}
            scrollEventThrottle={16}
            snapToAlignment={'center'}
            initialNumToRender={1}
            data={episodes}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            renderItem={({item}) => (
              <VideoPlayer
                id={item.id}
                title={item.title}
                url={item.url}
                current={item.id === currentEpisode.id}
              />
            )}
            keyExtractor={item => item.id}
          />
        </LinearGradient>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
});
