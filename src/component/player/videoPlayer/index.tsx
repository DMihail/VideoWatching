import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import {useSelector} from 'react-redux';
import {COLORS} from '../../../rules/COLORS.ts';
import {ReduxStoreState} from '../../../redux';
import setReviewedData from '../../../utils/setReviewedData.ts';
import showSimpleToast from '../../../utils/showSimpleToast.ts';
import PlayerControl from '../playerControl';

type Context = {
  endTime: number;
  currentTime: number;
  rewindRecording: (time: number) => void;
};

export const RecordContext = createContext<Context>(null);

export type VideoPlayerProps = {
  id: string;
  title: string;
  url: string;
  current: boolean;
  back: () => void;
};
export default function VideoPlayer({
  id,
  url,
  current,
  back,
}: VideoPlayerProps) {
  const videoRef = useRef<Video>(null);
  const reviewedParts = useSelector(
    (state: ReduxStoreState) => state.reviewedParts,
  );
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  const play = useCallback(() => {
    setIsPlay(!isPlay);
  }, [isPlay]);

  const rewindRecording = useCallback(
    (time: number) => {
      if (videoRef.current) {
        videoRef.current.seek(time);
      }
    },
    [videoRef.current],
  );

  const contextValue = useMemo(
    () => ({
      endTime,
      currentTime,
      rewindRecording,
    }),
    [endTime, currentTime, rewindRecording],
  );

  useEffect(() => {
    if (reviewedParts && reviewedParts[id]) {
      setCurrentTime(reviewedParts[id]);
    }
  }, []);

  useEffect(() => {
    if (videoRef.current && load) {
      !play && videoRef.current.seek(currentTime);
      current ? setIsPlay(true) : setIsPlay(false);
    }
  }, [videoRef, current, load, currentTime]);

  return (
    <RecordContext.Provider value={contextValue}>
      <TouchableWithoutFeedback onPress={play}>
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
            onLoad={data => {
              setLoad(true);
              setEndTime(data.duration);
            }}
            ref={videoRef}
            onBuffer={() => console.log('buffer')}
            onError={e => {
              if (__DEV__) {
                console.log(e);
              }
              back();
              showSimpleToast('Video loading error!');
            }}
            onProgress={e => {
              setCurrentTime(e.currentTime);
              setReviewedData(
                id,
                'reviewedParts',
                e.currentTime,
                reviewedParts ? reviewedParts.toObject() : null,
              );
            }}
            repeat={true}
            paused={!isPlay}
            resizeMode={'cover'}
            fullscreen={false}
            style={styles.backgroundVideo}
            id={id}
          />
          <PlayerControl isPlay={isPlay} play={play} />
        </View>
      </TouchableWithoutFeedback>
    </RecordContext.Provider>
  );
}
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height,
  },
  gradientLoader: {
    height: width,
    width,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    height: width,
    width,
  },
  pause: {
    position: 'absolute',
    opacity: 0.5,
  },
});
