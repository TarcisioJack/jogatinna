import React from 'react';
import {
  StyleSheet,
  Text,
  Image
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlayerProps extends RectButtonProps {
  data: {
    id: string;
    name: string;
    photo: string;
  }
}

export const PlayerCardPrimary = ({ data, ...rest} : PlayerProps) => {
  return (
    <RectButton
      style={styles.container}
      {...rest}
    > 
      <Image 
        source={{uri: data.photo}}
        style={{width:100, height:100, borderRadius: 8}}
      />

      <Text style={styles.text}>
        { data.name }
      </Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    maxWidth: '45%',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    margin: 10
  },
  text: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
    marginVertical: 5
  }
});