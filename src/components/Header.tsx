import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import NarutoShippudenLogo from '../assets/NarutoShippudenLogo.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.playerName}>Joga</Text>
        <Text style={styles.greeting}>Tinna</Text>
      </View>
      <Image source={NarutoShippudenLogo} style={styles.image}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 1,
    marginTop: getStatusBarHeight(),
  },
  image:{
    width: 300,
    height: 150,
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text
  },
  playerName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading
  }
});