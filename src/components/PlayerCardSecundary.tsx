import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { RectButton, RectButtonProps, Swipeable } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { ScorePlayer } from './ScorePlayer';

interface PlayerProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  };
  handleRemove: () => void;
}

export const PlayerCardSecundary = ({ data, handleRemove} : PlayerProps) => {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton
              style={styles.buttonRemove}
              onPress={handleRemove}
            >
              <Feather name="trash-2" size={32} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <View
        style={styles.container}
      >
        <Image 
          source={{uri:data.photo}}
          style={{width:50, height:50, borderRadius:8}}
        />
        
        <View style={styles.content}>
          <Text style={styles.title}>
            { data.name }
          </Text>
            <ScorePlayer />
        </View>
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container:{
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.shape,
    marginVertical: 5,
    justifyContent: 'space-between'
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  title: {
    flex: 1,
    marginLeft: 15,
    fontFamily: fonts.heading,
    fontSize: 17,
    color: colors.heading
  },
  details: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  label:{
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_light
  },
  buttonRemove: {
    width: 70,
    height: 60,
    backgroundColor: colors.red,
    marginTop: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    right: 20,
    paddingLeft: 15
  }
});