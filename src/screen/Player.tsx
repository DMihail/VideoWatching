import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {MainStackProps} from '../navigation/types.ts';
import PlayerHeader from '../component/player/header';
import {COLORS} from '../rules/COLORS.ts';
import VideoPlayer, {VideoPlayerProps} from '../component/player/videoPlayer';
import {ReduxHelper, SagaHelper} from '../redux';
import Loader from '../component/Loader.tsx';

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 40,
  waitForInteraction: true,
};

type Episode = Omit<VideoPlayerProps, 'current'>;

export default function Player({route, navigation}: MainStackProps<'Player'>) {
  const {id} = route.params;
  const [load, setLoad] = useState<boolean>(true);
  const [episodes, setEpisodes] = useState<Array<Episode>>([]);
  const [currentEpisode, setCurrentEpisode] = useState<Episode>(episodes[0]);

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length === 1) {
      setCurrentEpisode(viewableItems[0].item);
    }
  }, []);

  const getBook = async () => {
    try {
      const episodes: Array<Episode> = await SagaHelper.run(
        ['content', 'getCurrentBook'],
        id,
      );
      if (episodes && route.params) {
        setEpisodes(episodes);
        setCurrentEpisode(episodes[0]);
        ReduxHelper.setIn(['lastBook'], route.params);
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
