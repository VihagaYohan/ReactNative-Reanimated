import {program} from '@babel/types';
import React, {Component, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';

const SIZE = 100;

const SampleScreen = () => {
  const progress = useSharedValue(0);
  const scale = useSharedValue(1);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [
        {scale: scale.value},
        {
          rotate: handleRotation(progress),
        },
      ],
    };
  }, []);

  useEffect(() => {
    /*  progress.value = withTiming(1, {duration: 5000});
    scale.value = withTiming(2, {duration: 5000}); */
    progress.value = withRepeat(withSpring(0.5), 3, false);
    scale.value = withRepeat(withSpring(1), 3, true);
  }, []);

  const handleRotation = progress => {
    'worklet';
    return `${progress.value * 2 * Math.PI}rad`;
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {height: SIZE, width: SIZE, backgroundColor: 'red'},
          reanimatedStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SampleScreen;
