import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';

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
  const {width, height} = useWindowDimensions();
  const [play, setPlay] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (videoRef.current && load) {
      current ? setPlay(true) : setPlay(false);
    }
  }, [videoRef, current, load]);
  console.log(current && load);
  return (
    <View
      style={{
        flex: 1,
        height,
        width,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}>
      {/*<Video*/}
      {/*  source={{*/}
      {/*    uri: url,*/}
      {/*  }}*/}
      {/*  onLoad={() => {*/}
      {/*    console.log(2222222);*/}
      {/*    console.log(title);*/}
      {/*    setLoad(true);*/}
      {/*  }}*/}
      {/*  ref={videoRef}*/}
      {/*  onBuffer={() => console.log('buffer')}*/}
      {/*  onError={e => console.log(e)}*/}
      {/*  controls={current && load}*/}
      {/*  paused={!play}*/}
      {/*  resizeMode={'contain'}*/}
      {/*  fullscreen={true}*/}
      {/*  style={styles.backgroundVideo}*/}
      {/*  id={id}*/}
      {/*/>*/}
      <Text style={{color: 'black'}}>{title}</Text>
    </View>
  );
}
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  backgroundVideo: {
    height,
    width,
  },
});
