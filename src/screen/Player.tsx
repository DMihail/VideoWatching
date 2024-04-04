import React, {useCallback, useState} from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {MainStackProps} from '../navigation/types.ts';
import PlayerHeader from '../component/player/header';
import {COLORS} from '../rules/COLORS.ts';
import VideoPlayer, {VideoPlayerProps} from '../component/player/videoPlayer';

const episodes = [
  {
    id: 'ida769be7147524',
    title: 'Episode 1',
    url: 'https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/convertedwife.m3u8',
  },
  {
    id: 'ida769be7147525',
    title: 'Episode 2',
    url: 'https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/2wife2.m3u8',
  },
  {
    id: 'ida769be7147526',
    title: 'Episode 3',
    url: 'https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/3wife3.m3u8',
  },
  {
    id: 'ida769be7147527',
    title: 'Episode 4',
    url: 'https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/4wife4.m3u8',
  },
  {
    id: 'ida769be7147528',
    title: 'Episode 5',
    url: 'https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/5wife5.m3u8',
  },
  {
    id: 'ida769be7147529',
    title: 'Episode 6',
    url: 'https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/6wife6.m3u8',
  },
  {
    id: 'ida769be714752k',
    title: 'Episode 7',
    url: 'https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/7wife7.m3u8',
  },
  {
    id: 'ida769be714752i',
    title: 'Episode 8',
    url: 'https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/8wife8.m3u8',
  },
];

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 40,
  waitForInteraction: true,
};

export default function Player({route, navigation}: MainStackProps<'Player'>) {
  const [currentEpisode, setCurrentEpisode] = useState<
    Omit<VideoPlayerProps, 'current'>
  >(episodes[0]);

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length === 1) {
      setCurrentEpisode(viewableItems[0].item);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
