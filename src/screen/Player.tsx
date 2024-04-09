import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {MainStackProps} from '../navigation/types.ts';
import PlayerHeader from '../component/player/header';
import {COLORS} from '../rules/COLORS.ts';
import VideoPlayer, {VideoPlayerProps} from '../component/player/videoPlayer';
import {ReduxHelper, ReduxStoreState, SagaHelper} from '../redux';
import Loader from '../component/Loader.tsx';
import {useSelector} from 'react-redux';
import setReviewedData from '../utils/setReviewedData.ts';

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 40,
  waitForInteraction: true,
};

type Episode = Omit<VideoPlayerProps, 'current'>;

export default function Player({route, navigation}: MainStackProps<'Player'>) {
  const {height} = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);
  const reviewedBooks = useSelector(
    (state: ReduxStoreState) => state.reviewedBooks,
  );
  const {id} = route.params;
  const [load, setLoad] = useState<boolean>(true);
  const [scrollToPart, setScrollToPart] = useState<number>();
  const [episodes, setEpisodes] = useState<Array<Episode>>([]);
  const [currentEpisode, setCurrentEpisode] = useState<Episode>();

  const onViewableItemsChanged = useCallback(
    ({viewableItems}) => {
      if (viewableItems.length === 1) {
        setCurrentEpisode(viewableItems[0].item);
        setReviewedData(
          id,
          'reviewedBooks',
          viewableItems[0].index,
          reviewedBooks ? reviewedBooks.toObject() : null,
        );
      }
    },
    [id, reviewedBooks],
  );

  const getBook = async () => {
    try {
      const episodes: Array<Episode> = await SagaHelper.run(
        ['content', 'getCurrentBook'],
        id,
      );
      const currentPart = reviewedBooks ? reviewedBooks[id] : 0;
      if (episodes && route.params) {
        setEpisodes(episodes);
        ReduxHelper.setIn(['lastBook'], route.params);
        if (currentPart !== null) {
          setCurrentEpisode(episodes[currentPart]);
          setScrollToPart(currentPart);
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

  useEffect(() => {
    if (scrollToPart && !load && flatListRef.current) {
      flatListRef.current?.scrollToIndex({
        index: scrollToPart,
      });
    }
  }, [flatListRef, load, scrollToPart]);

  return (
    <SafeAreaView style={styles.container}>
      {!currentEpisode || load ? (
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
            decelerationRate={'fast'}
            snapToInterval={height}
            data={episodes}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            onScrollToIndexFailed={info => {
              const wait = new Promise(resolve => setTimeout(resolve, 500));
              wait.then(() => {
                flatListRef.current?.scrollToIndex({
                  index: info.index,
                  animated: false,
                });
              });
            }}
            renderItem={({item}) => (
              <VideoPlayer
                id={item.id}
                title={item.title}
                url={item.url}
                current={item.id === currentEpisode.id}
                back={() => navigation.goBack()}
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
