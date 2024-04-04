import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import {COLORS} from '../../../rules/COLORS.ts';

export type VideoPlayerProps = {
  id: string;
  title: string;
  url: string;
  current: boolean;
};
export default function VideoPlayer({
  id,
  url,
  title,
  current,
}: VideoPlayerProps) {
  const videoRef = useRef(null);
  const [play, setPlay] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (videoRef.current && load) {
      current ? setPlay(true) : setPlay(false);
    }
  }, [videoRef, current, load]);

  return (
    <View style={styles.container}>
      {!load && (
        <LinearGradient
          colors={[COLORS.black, COLORS.white, COLORS.black]}
          locations={[0.1, 0.5, 1]}
          style={styles.gradientLoader}>
          <ActivityIndicator size={'large'} color={COLORS.black} />
        </LinearGradient>
      )}
      <Video
        source={{
          uri: url,
        }}
        onLoad={() => setLoad(true)}
        ref={videoRef}
        onBuffer={() => console.log('buffer')}
        onError={e => console.log(e)}
        onProgress={e => console.log(e)}
        paused={!play}
        resizeMode={'contain'}
        fullscreen={true}
        style={styles.backgroundVideo}
        id={id}
      />
    </View>
  );
}
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  gradientLoader: {
    height: width,
    width,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    height,
    width,
  },
});
