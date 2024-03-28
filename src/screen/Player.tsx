import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {MainStackProps} from '../navigation/types.ts';
import Video from 'react-native-video';

export default function Player({route}: MainStackProps<'Player'>) {
  const videoRef = useRef(null);
  return (
    <SafeAreaView>
      <Video
        source={{
          uri: 'https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/convertedwife.m3u8',
        }}
        ref={videoRef}
        onBuffer={() => console.log('buffer')}
        onError={e => console.log(e)}
        style={styles.backgroundVideo}
        controls={true}
        fullscreen={true}
        resizeMode={'contain'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundVideo: {
    height: '100%',
  },
});
